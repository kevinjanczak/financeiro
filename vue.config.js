module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    $primary: #035E7B;
                    $success: #43AA8B;
                    $danger: #FF331F;
                    $white: #FFF;
                    $black: #000;
                `
            }
        }
    }
}