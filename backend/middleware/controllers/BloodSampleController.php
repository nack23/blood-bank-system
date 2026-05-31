<?php

require_once './models/BloodSample.php';

class BloodSampleController
{
    private $sample;

    public function __construct($db)
    {
        $this->sample = new BloodSample($db);
    }

    public function addSample()
    {
        $data = json_decode(
            file_get_contents("php://input"),
            true
        );

        $result = $this->sample->addSample(
            $data['hospital_id'],
            $data['blood_group'],
            $data['units']
        );

        echo json_encode([
            "success" => $result
        ]);
    }

    public function getBloodSamples()
    {
        $samples = $this->sample->getBloodSamples();

        echo json_encode($samples);
    }
}