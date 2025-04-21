<?php
function conect()
{
    $nom_Servidor = "localhost";
    $username = "root";
    $password = "";
    $basedatos = "cafeteria";

    try {
        $conexion = new PDO("mysql:host=$nom_Servidor;dbname=$basedatos;charset=utf8", $username, $password);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conexion;
    } catch (PDOException $e) {
        echo "Error de conexión: " . $e->getMessage();
        return null;
    }
}

$conexion = conect();

if ($conexion) {
    $data = json_decode(file_get_contents("php://input"), true);
    $pedido = $data['pedido'] ?? [];
    $fecha = date("Y-m-d H:i:s");

    // Extraer solo los nombres de los productos
    $nombres = [];
    $total = 0;

    foreach ($pedido as $item) {
        if (isset($item['producto'])) {
            $nombres[] = $item['producto'];
        }
        if (isset($item['precio'])) {
            $total += $item['precio'];
        }
    }

    $detalle = json_encode($nombres); // Guarda solo los nombres

    $sql = "INSERT INTO pedidos (detalle, fecha, total) VALUES (:detalle, :fecha, :total)";
    $stmt = $conexion->prepare($sql);

    $stmt->bindParam(':detalle', $detalle);
    $stmt->bindParam(':fecha', $fecha);
    $stmt->bindParam(':total', $total);

    if ($stmt->execute()) {
        echo "✅ Pedido guardado correctamente con total $" . number_format($total, 2);
    } else {
        http_response_code(500);
        echo "❌ Error al guardar el pedido.";
    }

    $stmt = null;
    $conexion = null;
} else {
    http_response_code(500);
    echo "❌ No se pudo conectar a la base de datos.";
}
?>





