<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

try {
    $connection = getConnection();
    $query = 'SELECT id, name, description, price, category FROM menu_items WHERE is_available = 1 ORDER BY id ASC';
    $result = $connection->query($query);

    $menu = [];
    while ($row = $result->fetch_assoc()) {
        $menu[] = [
            'id' => (int) $row['id'],
            'name' => $row['name'],
            'description' => $row['description'],
            'price' => (float) $row['price'],
            'category' => $row['category'],
        ];
    }

    jsonResponse([
        'success' => true,
        'menu' => $menu,
    ]);
} catch (Throwable $error) {
    jsonResponse([
        'success' => false,
        'message' => 'Database connection failed. Import backend/schema.sql and update backend/config.php.',
        'error' => $error->getMessage(),
    ], 500);
}
