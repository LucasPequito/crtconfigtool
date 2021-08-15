window.onload = function () {

    let aspectRationRun = document.getElementById("calc_aspc_rt");
    aspectRationRun.addEventListener("click", Run);

    let clearAllButton = document.getElementById("clearAll_res_ref");
    clearAllButton.addEventListener("click", clearAll);

    /*Button functions to run, clear, and clear all fields*/

    function clearAll() {

        document.resolution_aspectRatio.horizontal_px.value = "";
        document.resolution_aspectRatio.vertical_px.value = "";
        document.resolution_aspectRatio.aspect_ratio_h.value = "";
        document.resolution_aspectRatio.aspect_ratio_v.value = "";

    }

    function Run() {

        var horzRes = document.resolution_aspectRatio.horizontal_px.value;
        var vertRes = document.resolution_aspectRatio.vertical_px.value;
        var aspectRatioH = document.resolution_aspectRatio.aspect_ratio_h.value;
        var aspectRatioV = document.resolution_aspectRatio.aspect_ratio_v.value;

        let fieldValidations = validateFields(horzRes, vertRes, aspectRatioH, aspectRatioV);

        if (fieldValidations == "error") {

            alert("Error!");

        } else if (fieldValidations == "horzRes") {

            var result = calculateHorizontal(vertRes, aspectRatioH, aspectRatioV);
            document.resolution_aspectRatio.horizontal_px.value = result;


        } else if (fieldValidations == "vertRes") {

            var result = calculateVertical(horzRes, aspectRatioH, aspectRatioV);
            document.resolution_aspectRatio.vertical_px.value = result;

        } else {

            var result = calculateAspectRatio(horzRes, vertRes);

            document.resolution_aspectRatio.aspect_ratio_h.value = result.charAt(0);
            document.resolution_aspectRatio.aspect_ratio_v.value = result.charAt(1);

        }

    }

    function calculateHorizontal(vertRes, aspectRatioH, aspectRatioV) {

        var horzRes = aspectRatioH * vertRes / aspectRatioV;
        return horzRes;

    }

    function calculateVertical(horzRes, aspectRatioH, aspectRatioV) {

        var vertRes = horzRes * aspectRatioV / aspectRatioH;
        return vertRes;

    }

    function calculateAspectRatio(horzRes, vertRes) {

        var smallerHalf; /*highest integer value a number is divisible by is its own half*/
        
        horzRes = parseInt(horzRes);
        vertRes = parseInt(vertRes);

        if (vertRes < horzRes) {

            smallerHalf = vertRes / 2;

        } else {

            smallerHalf = horzRes / 2;

        }

        var i = 2; /*Iniciated as 2, or else will loop forever since a all numbers are divisible by 1*/

        while (i < smallerHalf) {

            if (horzRes % i == 0 && vertRes % i == 0) { /*If both measurements are divisible by the iterator ie i is CGF* of both*/

                horzRes = horzRes / i;  /*If true divide both numbers by their common divisor*/
                vertRes = vertRes / i;

            } else { /*If false jump to the next divisor until it reaches smallestHalf*/

                i++;

            }

        }

        return horzRes.toString() + vertRes.toString();

    }

    function validateFields(horzRes, vertRes, aspectRatioH, aspectRatioV) {

        if (horzRes == "") {

            return "horzRes";

        } else if (vertRes == "") {

            return "vertRes";

        } else if (aspectRatioH == "" && aspectRatioV == "") {

            return "aspectRatio";

        } else {

            return "error";

        }

    }

}