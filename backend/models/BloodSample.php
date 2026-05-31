<?php

class BloodSample
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function addSample($hospital_id, $blood_group, $units)
    {
        $sql = "INSERT INTO blood_samples
                (hospital_id, blood_group, units)
                VALUES (?, ?, ?)";

        $stmt = $this->conn->prepare($sql);

        if (!$stmt) {
            return false;
        }

        $stmt->bind_param(
            "isi",
            $hospital_id,
            $blood_group,
            $units
        );

        return $stmt->execute();
    }

    public function getHospitalSamples($hospital_id)
    {
        $sql = "SELECT *
                FROM blood_samples
                WHERE hospital_id = ?
                ORDER BY id DESC";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $hospital_id);
        $stmt->execute();

        return $stmt->get_result();
    }

    public function getBloodSamples()
    {
        $sql = "
        SELECT
            blood_samples.id,
            users.name AS hospital_name,
            blood_samples.blood_group,
            blood_samples.units,
            blood_samples.created_at
        FROM blood_samples
        INNER JOIN users
        ON users.id = blood_samples.hospital_id
        ORDER BY blood_samples.id DESC
        ";

        $result = $this->conn->query($sql);

        $samples = [];

        while ($row = $result->fetch_assoc()) {
            $samples[] = $row;
        }

        return $samples;
    }
}