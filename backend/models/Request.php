<?php

class Request
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function sendRequest(
        $receiver_id,
        $sample_id,
        $units
    )
    {
        $sql = "
        INSERT INTO requests
        (
            receiver_id,
            sample_id,
            units
        )
        VALUES (?, ?, ?)
        ";

        $stmt = $this->conn->prepare($sql);

        if (!$stmt) {
            return false;
        }

        $stmt->bind_param(
            "iii",
            $receiver_id,
            $sample_id,
            $units
        );

        return $stmt->execute();
    }
public function getRequests($hospital_id)
{
    $sql = "
    SELECT

        requests.id,

        receiver.name AS receiver_name,

        hospital.name AS hospital_name,

        blood_samples.blood_group,

        requests.units AS requested_units,

        blood_samples.units AS available_units,

        requests.status,

        requests.request_date

    FROM requests

    INNER JOIN users receiver
    ON requests.receiver_id = receiver.id

    INNER JOIN blood_samples
    ON requests.sample_id = blood_samples.id

    INNER JOIN users hospital
    ON blood_samples.hospital_id = hospital.id

    WHERE blood_samples.hospital_id = ?

    ORDER BY requests.id DESC
    ";

    $stmt = $this->conn->prepare($sql);

    $stmt->bind_param(
        "i",
        $hospital_id
    );

    $stmt->execute();

    $result = $stmt->get_result();

    $requests = [];

    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }

    return $requests;
}

public function approveRequest($id)
{
    // Request details nikalo

    $sql = "
    SELECT
        requests.sample_id,
        requests.units AS requested_units,
        blood_samples.units AS available_units

    FROM requests

    INNER JOIN blood_samples
    ON requests.sample_id = blood_samples.id

    WHERE requests.id = ?
    ";

    $stmt = $this->conn->prepare($sql);

    $stmt->bind_param("i", $id);

    $stmt->execute();

    $result = $stmt->get_result();

    $row = $result->fetch_assoc();

    if (!$row) {
        return false;
    }

    $requested = $row['requested_units'];
    $available = $row['available_units'];
    $sample_id = $row['sample_id'];

    // Stock check

    if ($requested > $available) {

        return false;

    }

    // New stock

    $newUnits = $available - $requested;

    // Blood sample update

    $sql = "
    UPDATE blood_samples
    SET units = ?
    WHERE id = ?
    ";

    $stmt = $this->conn->prepare($sql);

    $stmt->bind_param(
        "ii",
        $newUnits,
        $sample_id
    );

    $stmt->execute();

    // Request approve

    $sql = "
    UPDATE requests
    SET status='Approved'
    WHERE id=?
    ";

    $stmt = $this->conn->prepare($sql);

    $stmt->bind_param(
        "i",
        $id
    );

    return $stmt->execute();
} 
public function getReceiverRequests($receiver_id)
{
    $sql = "
    SELECT

        requests.id,

        hospital.name AS hospital_name,

        blood_samples.blood_group,

        requests.units,

        requests.status,

        requests.request_date

    FROM requests

    INNER JOIN blood_samples
    ON requests.sample_id = blood_samples.id

    INNER JOIN users hospital
    ON blood_samples.hospital_id = hospital.id

    WHERE requests.receiver_id = ?

    ORDER BY requests.id DESC
    ";

    $stmt = $this->conn->prepare($sql);

    $stmt->bind_param(
        "i",
        $receiver_id
    );

    $stmt->execute();

    $result = $stmt->get_result();

    $requests = [];

    while($row = $result->fetch_assoc())
    {
        $requests[] = $row;
    }

    return $requests;
}

}