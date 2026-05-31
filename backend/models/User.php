<?php

class User
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function register($name, $email, $password, $role, $blood_group = null)
    {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users
                (name,email,password,role,blood_group)
                VALUES (?,?,?,?,?)";

        $stmt = $this->conn->prepare($sql);

        if (!$stmt) {
            return "Prepare Failed: " . $this->conn->error;
        }

        $stmt->bind_param(
            "sssss",
            $name,
            $email,
            $hashedPassword,
            $role,
            $blood_group
        );

        if (!$stmt->execute()) {
            return "Execute Failed: " . $stmt->error;
        }

        return true;
    }

    public function login($email, $password)
    {
        $sql = "SELECT * FROM users WHERE email = ?";

        $stmt = $this->conn->prepare($sql);

        if (!$stmt) {
            return false;
        }

        $stmt->bind_param("s", $email);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            return false;
        }

        $user = $result->fetch_assoc();

        if (!password_verify($password, $user['password'])) {
            return false;
        }

        unset($user['password']);

        return $user;
    }
}