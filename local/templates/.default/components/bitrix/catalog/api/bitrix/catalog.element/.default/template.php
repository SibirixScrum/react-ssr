<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @var CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
//echo '<pre>';
//print_r($arResult);
//echo  '</pre>';
//die();
try {
    echo json_encode([
        'ID' => $arResult['ID'],
        'NAME' => $arResult['NAME'],
        'CODE' => $arResult['CODE'],
    ]);
} catch (Exception $e) {
    echo $e->getMessage();
}
