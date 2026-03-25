<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse([
        'success' => false,
        'message' => 'Only POST requests are allowed.',
    ], 405);
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);

if (!is_array($data)) {
    jsonResponse([
        'success' => false,
        'message' => 'Invalid request payload.',
    ], 400);
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$occasion = trim((string) ($data['occasion'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    jsonResponse([
        'success' => false,
        'message' => 'Name, email, and message are required.',
    ], 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse([
        'success' => false,
        'message' => 'Please enter a valid email address.',
    ], 422);
}

try {
    $connection = getConnection();
    $statement = $connection->prepare(
        'INSERT INTO contact_messages (name, email, occasion, message) VALUES (?, ?, ?, ?)'
    );
    $statement->bind_param('ssss', $name, $email, $occasion, $message);
    $statement->execute();

    jsonResponse([
        'success' => true,
        'message' => 'Enquiry submitted successfully.',
    ]);
} catch (Throwable $error) {
    jsonResponse([
        'success' => false,
        'message' => 'Could not save the enquiry. Check the database setup in backend/schema.sql.',
        'error' => $error->getMessage(),
    ], 500);
}
