<?php 

$data = include('01_extract.php');

// Benötigte Werte in Variablen speichern
$transformed_data = [
    'brienz_flow' => $data['values']['brienz']['flow'],
    'brienz_temperature' => $data['values']['brienz']['temperature'],
    'interlaken_flow' => $data['values']['interlaken']['flow'],
    'interlaken_temperature' => $data['values']['interlaken']['temperature'],
    'thun_flow' => $data['values']['thun']['flow'],
    'thun_temperature' => $data['values']['thun']['temperature'],
    'bern_flow' => $data['values']['bern']['flow'],
    'bern_temperature' => $data['values']['bern']['temperature'],
    'hagneck_flow' => $data['values']['hagneck']['flow'],
    'hagneck_temperature' => $data['values']['hagneck']['temperature'],
    'biel_flow' => $data['values']['biel']['flow'],
    'biel_temperature' => $data['values']['biel']['temperature'],
    'olten_flow' => $data['values']['olten']['flow'],
    'olten_temperature' => $data['values']['olten']['temperature'],
    'brugg_flow' => $data['values']['brugg']['flow'],
    'brugg_temperature' => $data['values']['brugg']['temperature'], 
];

return $transformed_data;

/*echo '<pre>';
//var_dump(fetchAareData());
print_r($transformed_data);
echo '</pre>';*/