window.onload = function () {

    let resolutionRefreshRun = document.getElementById("calc_res_ref");
    resolutionRefreshRun.addEventListener("click", calculateResolutionRefresh);

    let clearButton = document.getElementById("clear_res_ref");
    clearButton.addEventListener("click", clear);

    let clearAllButton = document.getElementById("clearAll_res_ref");
    clearAllButton.addEventListener("click", clearAll);

    /*Button functions to run, clear, and clear all fields*/

    function clear() {

        document.resolution_refresh.vertical_res.value = "";
        document.resolution_refresh.refresh_rate.value = "";

    }

    function clearAll() {

        document.resolution_refresh.horizontal_frequency.value = "";
        document.resolution_refresh.vertical_res.value = "";
        document.resolution_refresh.refresh_rate.value = "";

    }

    function calculateResolutionRefresh() {

        var horizontalScan = document.getElementById("horizontal_frequency").value;
        var verticalPixelCount = document.getElementById("vertical_res").value;
        var refreshRate = document.getElementById("refresh_rate").value;

        let fieldValidation = validateFields(horizontalScan, verticalPixelCount, refreshRate);

        if (fieldValidation == false) {

            alert("Only integer values allowed, leave the incquired field empty. (mind horizontal scan frequencial is mandatory!)");

        }
        else {

            if (refreshRate == "") { /*In case refresh rate is empty, calculate refresh rate*/

                var result = calculateRefreshRate(horizontalScan, verticalPixelCount);
                document.getElementById("refresh_rate").value = result;

            }

            if (verticalPixelCount == "") { /*In case vertical pixel count is empty, calculate refresh rate*/

                var result = calculateVerticalResolution(horizontalScan, refreshRate);
                document.getElementById("vertical_res").value = result;

            }

        }

    }

    /*Button functions to run, clear, and clear all fields*/

    /*functions*/

    function validateFields(field1, field2, field3) { /*Verifies which fields are empty or not an integer. Returns false if more or less than 1 is*/

        var count = 0;
        var validate;
        var toNum;

        // horizontal scanning frequency must be int and not empty

        if (field1 == ""){

            return false

        }

        toNum = Number(field1);
        validate = Number.isInteger(toNum);

        if (validate == false){

            return false;

        }
        
        // Intended vertical pixel count must be int

        if (field2 == ""){

            count++;

        }else{

            toNum = Number(field2);
            validate = Number.isInteger(toNum);

            if (validate == false){

                return false;

            }

        }
        
        // Refresh rate must be int

        if (field3 == ""){

            count++;

        }else{

            toNum = Number(field3);
            validate = Number.isInteger(toNum);

            if (validate == false){

                return false;

            }

        }
        
        // How many fields are empty

        if (count == 1) {

            return true;

        } else {

            return false;

        }

    }

    function calculateRefreshRate(horizontalScan, verticalPixelCount) {

        parseInt(horizontalScan);
        parseInt(verticalPixelCount);

        var result = horizontalScan / verticalPixelCount * 0.95;

        return result;

    }

    function calculateVerticalResolution(horizontalScan, refreshRate) {

        parseInt(horizontalScan);
        parseInt(refreshRate);

        var result = horizontalScan * 0.95 / refreshRate;

        return result;

    }

    /*functions*/

}



