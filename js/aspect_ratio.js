window.onload = function () {

    let aspectRationRun = document.getElementById("calc_aspc_rt");
    aspectRationRun.addEventListener("click", calculateAspectRatio);

    let clearAllButton = document.getElementById("clearAll_res_ref");
    clearAllButton.addEventListener("click", clearAll);

    /*Button functions to run, clear, and clear all fields*/

    function clearAll() {

        document.resolution_aspectRatio.horizontal_px.value = "";
        document.resolution_aspectRatio.vertical_px.value = "";
        document.resolution_aspectRatio.aspect_ratio.value = "";

    }

    function calculateAspectRatio() {

        var horzRes = Number(document.resolution_aspectRatio.horizontal_px.value); /*Horizontal pixel count*/
        var vertRes = Number(document.resolution_aspectRatio.vertical_px.value); /*vertical pixel count*/

        var validateHorz, validateVert;

        validateHorz = Number.isInteger(horzRes);
        validateVert = Number.isInteger(vertRes);

        if (validateHorz == true && validateVert == true) {

            var smallerHalf; /*highest integer value a number is divisible by is its own half*/

            if (vertRes < horzRes) {

                smallerHalf = vertRes / 2;

            } else {

                smallerHalf = horzRes / 2;

            }

            var i = 2; /*Iniciated as 2, or else will loop forever since a all number are divisible by 1*/

            while (i < smallerHalf) {

                if (horzRes % i == 0 && vertRes % i == 0) { /*If both measurements are divisible by the iterator ie i is CGF* of both*/

                    horzRes = horzRes / i;  /*If true divide both numbers by their common divisor*/
                    vertRes = vertRes / i;

                    continue;

                } else { /*If false jump to the next divisor until it reaches smallestHalf*/

                    i++;

                }

            }

            var aspctRatio = horzRes + ":" + vertRes;
            document.resolution_aspectRatio.aspect_ratio.value = aspctRatio;

        }else{

            alert("both horizontal and vertical sizes must be an integer number");

        }

    }

}