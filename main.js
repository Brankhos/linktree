let fileNames = new Array();
const animated_file = "./assets/svg/animated_pandas/"
let animated_dict = {}
$.ajax({
    url: animated_file,
    success: function (data) {
        $(data).find("td > a").each(function () {
            if (openFile($(this).attr("href"), "svg")) {
                fileNames.push($(this).attr("href"));
            }
        });
        merge_svgs(fileNames)

    }
});

function openFile(file, filetype = NaN) {
    var extension = file.substr((file.lastIndexOf('.') + 1));
    if (filetype && filetype == extension) {
        return true
    }
    switch (extension) {
        case 'jpg':
        case 'png':
        case 'gif':   // the alert ended with pdf instead of gif.
        case 'zip':
        case 'rar':
        case 'pdf':
        case 'php':
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
        case 'svg':
            return true;
        default:
            return false;
    }
};
function merge_svgs(svg_list) {
    const timed = 2
    svg_list = svg_list.sort(function (a, b) { return a - b; });
    var splitted2;
    $.each(svg_list, function (index, element) {

        var splitted = element.split(/[._]/).slice(0, -1)
        splitted2 = splitted
        if (!animated_dict.hasOwnProperty(splitted[0])) {
            animated_dict[splitted[0]] = {}
        }
        if (!animated_dict[splitted[0]].hasOwnProperty(splitted[1])) {


            animated_dict[splitted[0]][splitted[1]] = {}
        }
        if (!animated_dict[splitted[0]][splitted[1]].hasOwnProperty(splitted[2])) {
            animated_dict[splitted[0]][splitted[1]][splitted[2]] = {}
        }
        delete animated_dict[splitted[0]][undefined];
        $.ajax({
            url: animated_file + element,
            success: function (data) {
                if (splitted[1] == "default") {
                    $(`svg#${splitted[0]} g`).html($(data).find("g").html())
                }
                $(data).find("g > path").each(function () {
                    animated_dict[splitted[0]][splitted[1]][splitted[2]][$(this).attr("id")] = $(this).attr("d")

                });
            }
        }).then(function () {

            if (index == svg_list.length - 1) {
                var step_dict = {}
                for (const [key, value] of Object.entries(animated_dict[splitted[0]]["step"])) {
                    for (const [key2, value2] of Object.entries(value)) {
                        if (!step_dict.hasOwnProperty(key2)) {
                            step_dict[key2] = [value2]
                        } else {
                            step_dict[key2].push(...[value2]);
                        }
                    }
                }


                for (const [key, value] of Object.entries(step_dict)) {

                    //var inside_key = `\n#${key} {\nd:path("${animated_dict[splitted[0]]["default"][1][key]}");\nanimation: ${key} 2s linear infinite;\n}`
                    var inside_key = `\n#${key} {\nd:path("${animated_dict[splitted[0]]["default"]["01"][key]}");\nanimation: ${key} ${timed}s linear infinite;\n}`

                    $("head").append(`<style id='${splitted[0]}-${key}-css' type='text/css'> ` + inside_key + " </style>");

                    var keyframe = `<style id='${splitted[0]}-${key}-keyframe' type='text/css'> @keyframes ${key} {`
                    var value_length = 100 / (value.length + 1)
                    for (const [key2, value2] of Object.entries(value)) {
                        if (key2 == 0) {
                            keyframe += `\n0%, 100%{ \nd:path("${value2}");\n}`
                        } else {
                            keyframe += `\n${Math.round(key2 * value_length)}%{ \nd:path("${value2}");\n}`

                        }
                    }
                    keyframe += "\n}</style>"
                    $("head").append(keyframe);

                }
                //total_key = style_start + total_key + style_end
                //$("head").append(total_key);









            }
        });
        /*
        var style_start = "<style type='text/css'> "
        var style_end = " </style>"
        set_pause = `#${splitted[0]} g>path:hover ~ path {animation-play-state: paused;}`
        total_key = style_start + set_pause + style_end
        $("head").append(total_key);
        */


    });
    const timed2 = 0.5
    $(`.ornekbuton`)
        .on("mouseenter", function () {
            $(".grass").css("animation-play-state", "paused");
            $(".background-inner").css("animation-play-state", "paused");
            var lookup_dict = {}
            for (const [key, value] of Object.entries(animated_dict[splitted2[0]]["lookup"])) {
                for (const [key2, value2] of Object.entries(value)) {
                    if (!lookup_dict.hasOwnProperty(key2)) {
                        lookup_dict[key2] = [value2]
                    } else {
                        lookup_dict[key2].push(...[value2]);
                    }
                }
            }

            $(`#${splitted2[0]}`).find("g>path").each(function () {
                lookup_dict[$(this).attr("id")].splice(0, 0, $(this).css("d").slice(6, -2))
            });

            for (const [key, value] of Object.entries(lookup_dict)) {
                var inside_key = `\n#${key} {\nd:path("${animated_dict[splitted2[0]]["lookup"]["01"][key]}");\nanimation: ${key}-lookup ${timed2}s linear forwards;\n}`

                $("head" + ` #${splitted2[0]}-${key}-css`).html(inside_key);

                var keyframe = `@keyframes ${key}-lookup {`
                var value_length = 100 / (value.length - 1)
                for (const [key2, value2] of Object.entries(value)) {

                    if (key2 == 0) {
                        keyframe += `\n0%{ \nd:path("${value2}");\n}`


                    } else {
                        keyframe += `\n${Math.round(key2 * value_length)}%{ \nd:path("${value2}");\n}`

                    }
                }
                keyframe += "\n}"
                if ($("head" + ` #${splitted2[0]}-${key}-keyframe-lookup`).length != 0) {
                    $("head" + ` #${splitted2[0]}-${key}-keyframe-lookup`).html(keyframe);
                } else {
                    $("head").append(`<style id='${splitted2[0]}-${key}-keyframe-lookup' type='text/css'>` + keyframe + "</style>");
                }
            }


        })
        .on("mouseleave", async function () {
            var default_dict = {}
            for (const [key, value] of Object.entries(animated_dict[splitted2[0]]["step"]["01"])) {
                if (!default_dict.hasOwnProperty(key)) {
                    default_dict[key] = [value]
                } else {
                    default_dict[key].push(...[value]);
                }

            }

            $(`#${splitted2[0]}`).find("g>path").each(function () {
                default_dict[$(this).attr("id")].splice(0, 0, $(this).css("d").slice(6, -2))
            });

            for (const [key, value] of Object.entries(default_dict)) {

                var inside_key = `\n#${key} {\nd:path("${animated_dict[splitted2[0]]["step"]["01"][key]}");\nanimation: ${key}-lookdown ${timed2}s linear forwards;\n}`

                $("head" + ` #${splitted2[0]}-${key}-css`).html(inside_key);

                var keyframe = `@keyframes ${key}-lookdown {`
                var value_length = 100 / (value.length - 1)
                for (const [key2, value2] of Object.entries(value)) {
                    if (key2 == 0) {
                        keyframe += `\n0%{ \nd:path("${value2}");\n}`

                    } else {
                        keyframe += `\n${Math.round(key2 * value_length)}%{ \nd:path("${value2}");\n}`

                    }
                }
                keyframe += "\n}"

                if ($("head" + ` #${splitted2[0]}-${key}-keyframe-lookdown`).length != 0) {
                    $("head" + ` #${splitted2[0]}-${key}-keyframe-lookdown`).html(keyframe);
                } else {
                    $("head").append(`<style id='${splitted2[0]}-${key}-keyframe-lookdown' type='text/css'>` + keyframe + "</style>");

                }


            }


            $(`#${splitted2[0]}` + " g>path").off()
            $(`#${splitted2[0]}` + " g>path").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                function () {
                    var list_of_current_animations = []

                    $(`#${splitted2[0]}`).find("g>path").each(function () {
                        list_of_current_animations.push($(this).css("animation-name").split("-")[1] == "lookdown" ? true : false)
                        list_of_current_animations.push($(this).css("animation-name").split("-")[1] == "lookdown" ? true : false)

                    });
                    if (list_of_current_animations.every(element => element)) {
                        for (const [key, value] of Object.entries(default_dict)) {

                            var inside_key = `\n#${key} {\nd:path("${animated_dict[splitted2[0]]["step"]["01"][key]}");\nanimation: ${key} ${timed}s linear infinite;\n}`

                            $("head" + ` #${splitted2[0]}-${key}-css`).html(inside_key);
                            $(".grass").css("animation-play-state", "running");
                            $(".background-inner").css("animation-play-state", "running");

                        }
                    }
                });


        });

};
const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))



/*  Background settings  */
const background_locations = "./assets/svg/backgrounds/"
var background_array = {}
const background_weather_color = { clear: ["linear-gradient(#6dc6f2 0%, #c3e7fd 50%)", "none"], sunrise: ["linear-gradient(#c93b25 0%, #ffc749 50%)", "saturate(116%) contrast(169%)"], suprize: ["linear-gradient(#191a2e 0%, #ae7885 50%)", "none"] }


$.ajax({
    url: background_locations,
    success: function (data) {
        $(data).find("td > a").each(function () {
            if (openFile($(this).attr("href"), "svg")) {
                var split_it = $(this).attr("href").split("_")[1]
                if (!background_array.hasOwnProperty(split_it)) {
                    background_array[split_it] = []
                }
                background_array[split_it].push(background_locations + $(this).attr("href"));
            }
        });
        var empty_bg = []

        for (const [key, value] of Object.entries(background_array)) {
            if (key == "grass") {
                $(".grass").css("background-image", `url(${value[Math.floor(Math.random() * value.length)]})`)
            } else {
                empty_bg.push(`url(${value[Math.floor(Math.random() * value.length)]})`)
            }
        }
        var dict_keys = Object.keys(background_weather_color)
        var selected_random_weather = background_weather_color[dict_keys[Math.floor(Math.random() * dict_keys.length)]]
        $(".background-inner").css("background-image", empty_bg.join(","))
        $(".background-out").css("background-image", `${selected_random_weather[0]}`)
        $(".background-out").css("filter", `${selected_random_weather[1]}`)


    }
});


