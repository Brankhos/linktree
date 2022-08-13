
const side_show_width = $(":root").css("--side-show-width")
const side_width = $(":root").css("--side-width")
const reversed_side_width = "-" + parseInt(side_width) + "px";

const langs = JSON.parse(localStorage.getItem("langs"))
const portfoys = JSON.parse(localStorage.getItem("portfoys"))







var cur_lang = "en"
var curr_page = "home"
var home_loop_on = true
var home_loop_still_on = false
const level_max_about = 5

const filled_new = "<div class='filled'></div>"
const unfilled_new = "<div class='unfilled'></div>"
const gradi_filled_new = "<div class='gradi_filled'></div>"

const about_yes = "<div class='yes'></div>"
const about_no = "<div class='no'></div>"


const portfoy_selector = "<div class='selector'></div>"
const portfoy_inner_selector = "<div class='inner_selector'></div>"


const portfolio_fullscreen = "<div class='portfolio-fullscreen'><div><div class='images'></div><div id='name'></div><div id='detail'></div><div id='contin'></div><div id='lastStatus'></div></div>"
$(async function () {
    $("[class='content']").load("./templates/home.html", function () {
        on_home();
    });

    var empty_langs = ""
    $.each(langs, function (key, value) {
        empty_langs += "<li id='" + key + "'>" + key + "</li>"
    });

    $("#languages ul").html(empty_langs);

    $("#languages ul li").on("click", function () {
        cur_lang = $(this).attr("id");
        update_nav();
        change_txt(curr_page);
    });

    $("#language svg").on("click", function () {
        console.log($(this).parent().children("#languages"));
        $(this).parent().children("#languages").toggle();
    });

    await sleepNow(2000).then(function () {
        $("#languages").parent().children("#languages").toggle();

    })

});

$(".header#top").on("click", function () {
    if ($(this).hasClass("activate")) {
        $(".side#side").css("left", reversed_side_width);
        $(".content.after").hide();

    } else {
        $(".side#side").css("left", "0px");
        $(".content.after").show();
    };
    $(this).toggleClass("activate");

});

$(".content.after").on("click", function () {
    $(".side#side").css("left", reversed_side_width);
    $(".header#top").removeClass("activate");
    $(".content.after").hide();
});

$(window).on("resize", function (event) {
    if ($(this).width() > side_show_width) {
        $(".side#side").css("left", "0px");
    } else {
        $(".side#side").css("left", reversed_side_width);
    };
    $(".header#top").removeClass("activate");
    $(".content.after").hide();

    if (curr_page == "home") {
        var mcx_child = $(".mcx").children();
        mcx_child.each(function (index, element) {
            home_loop_switch_adjust(element.id)
        });
    };
});


$("[id^=s-j]").on("click", function () {
    $.when($("#selection .active").removeClass("active")).then(
        $(this).addClass("active")
    );
    $.when(curr_page = $(this).attr("nav")).then(
        change_page(curr_page)
    );
});

/*
$("#select_lang div").on("click", function () {
    $.when(cur_lang = $(this).attr("id")).then(
        update_nav(),
        change_txt("home"),
    )
    on_home();
    $("#select_lang_bg").hide();
});
*/
function update_nav() {
    Object.entries(langs[cur_lang]["navbar"]).forEach((element, index) => {
        $("#selection [nav^='" + element[0] + "'] span").html(element[1]);
    });
};

function on_home() {
    home_loop_switch($("#yazilimciyim"))

    home_loop()

    $(".mcx div").mouseover(function () {
        home_loop_on = false;
        home_loop_switch(this)

    }).mouseout(function () {
        home_loop_on = true
    });
};

function change_page(page_name) {
    $("[class='content']").load("./templates/" + page_name + ".html", function () {
        change_txt(page_name),
            on_home(); if (page_name == "home") { }
    });



}

function change_txt(page_name) {
    Object.entries(langs[cur_lang][page_name]).forEach((element, index) => {
        $("[txt='" + element[0] + "']").html(element[1]);
    });
};


function home_loop() {
    var mcx_child = $(".mcx").children();
    mcx_child.each(async function (index, element) {
        await sleepNow(5000 * index);
        if (curr_page == "home" && home_loop_on) {
            var leted = home_loop_switch(element)
        }
        if (mcx_child.length - 1 == index && curr_page == "home") {
            await sleepNow(5000)
            if (leted == true) {
                home_loop()
            }
        }
    });
};

function home_loop_switch(referance_element) {



    var check_here = $(referance_element).height();
    if (check_here !== 0) {
        var mcx_switch = $(".mcx-switch");

        mcx_switch.width($(referance_element).width());
        mcx_switch.height($(referance_element).height());

        mcx_switch.css("margin-left", $(referance_element).position().left);

        var arrow = $(".mcx-arrow");
        var calc_lefted = $(referance_element).position().left + $(referance_element).width() / 2 + parseFloat($(referance_element).css("padding-left"));
        arrow.css("margin-left", calc_lefted);


        var i_am = $(".iam");
        var i_am_ref = $(".i-am");
        i_am.width($(i_am_ref).width());
        i_am.height($(i_am_ref).height());
        i_am.css("margin-left", $(i_am_ref).position().left);


        var iam2 = $(".iam2");
        var iam3 = $(".iam3");
        var calc_lefted_iam2 = $(i_am_ref).position().left + $(i_am_ref).width() / 2 + parseFloat($(i_am_ref).css("padding-left")) - iam2.width() / 2;
        iam2.css("margin-left", calc_lefted_iam2);
        iam3.css("margin-left", calc_lefted_iam2);
        iam3.width(calc_lefted - calc_lefted_iam2)


        $(".cont").children().css("opacity", "0");
        $(".cont > #" + referance_element.id).css("opacity", "1")

        home_loop_switch_adjust(referance_element.id)

        return true
    } else {
        return false
    }

};

function home_loop_switch_adjust(id) {
    var will_change_out = $(".cont #" + id);
    var will_change_in = $(".cont #" + id + " div:first-child");
    var referance_element = $(".cont #" + id + " div:last-child");
    var ref_height = referance_element.height();
    var add_height = 100;
    will_change_in.css("height", ref_height + add_height * 2)
    var ad1 = parseFloat(will_change_out.css("padding-top"))
    var ad2 = parseFloat(will_change_out.css("padding-bottom"))
    var ad3 = parseFloat(will_change_out.css("border-width")) * 2
    will_change_out.css("height", ref_height + add_height * 2 + ad1 + ad2 + ad3)

};


const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))



/*  about  */

function about() {
    let last_height
    $(".yazilim-table tr td").each((index, element) => {
        const elem_id = $(element).attr('id')
        if (elem_id == "level_bar") {

            var new_gradi_filled_inf = $(gradi_filled_new).height(24).width(($(element).html().length / level_max_about * 100) + "%").wrap('<p/>').parent().html();

            $(element).html("<div>" + new_gradi_filled_inf + "</div>");

            /*
            var new_filled_inf = $(filled_new).height(24).wrap('<p/>').parent().html();
            var new_unfilled_inf = $(unfilled_new).height(24).wrap('<p/>').parent().html();
            var new_html = ""
            for (let i = 0; i < $(element).html().length; i++) {
                new_html += new_filled_inf;
            };

            for (let i = 0; i < level_max_about - $(element).html().length; i++) {
                new_html += new_unfilled_inf;
            };
            $(element).html("<div>" + new_html + "</div>");
            */

        } else if (elem_id == "learning") {
            if ($(element).html() == "Evet") {
                $(element).html($(about_yes).height(24).wrap('<p/>').parent().html())
            } else {
                $(element).html($(about_no).height(24).wrap('<p/>').parent().html())
            };
        } else if (elem_id == "using") {
            if ($(element).html() == "Evet") {
                $(element).html($(about_yes).height(24).wrap('<p/>').parent().html())
            } else {
                $(element).html($(about_no).height(24).wrap('<p/>').parent().html())
            };
        }
    });


    $(".bilgisayar-table tr td").each((index, element) => {
        const elem_id = $(element).attr('id')
        if (elem_id == "level_bar") {
            var new_filled_inf = $(filled_new).height(24).wrap('<p/>').parent().html();
            var new_unfilled_inf = $(unfilled_new).height(24).wrap('<p/>').parent().html();
            var new_html = ""
            for (let i = 0; i < $(element).html().length; i++) {
                new_html += new_filled_inf;
            };

            for (let i = 0; i < level_max_about - $(element).html().length; i++) {
                new_html += new_unfilled_inf;
            };
            $(element).html("<div>" + new_html + "</div>");
        } else if (elem_id == "learning") {
            if ($(element).html() == "Evet") {
                $(element).html($(about_yes).height(24).wrap('<p/>').parent().html())
            } else {
                $(element).html($(about_no).height(24).wrap('<p/>').parent().html())
            };
        } else if (elem_id == "using") {
            if ($(element).html() == "Evet") {
                $(element).html($(about_yes).height(24).wrap('<p/>').parent().html())
            } else {
                $(element).html($(about_no).height(24).wrap('<p/>').parent().html())
            };
        }
    });


}


function portfolio() {
    $("[class='images']").each((index, element) => {

        var element_count = $(element).children().length
        var selector_width = 100 / element_count
        var new_html = ""
        var new_inner = $(portfoy_inner_selector).width(selector_width + "%").wrap('<p/>').parent().html()
        for (let i = 0; i < element_count; i++) {
            new_html += new_inner;
        };

        $(element).append($(portfoy_selector).html(new_html).wrap('<p/>').parent().html())

        var latest_selector = $(element).children(".selector")
        latest_selector.children().each((index, element2) => {
            $(element2).mouseover(function () {
                $(element).children(":not(.selector)").css("opacity", 0)
                $(element).children().eq($(element2).index()).css("opacity", 1)
                $(element).children(".selector").children().css("opacity", 0.5)
                $(element2).css("opacity", 1)

            })
        });
    });


    $(".detail > div").on("click", function () {

        var new_portfolio_fullscreen = "<div class='portfolio-fullscreen'>" + $(portfolio_fullscreen).find(".images").html($(this).find(".images").html()).parent().parent().html() + "</div>"

        $("body").append(new_portfolio_fullscreen)
        var selector = $(".portfolio-fullscreen").find(".selector")
        var selector_parent = selector.parent()

        var detail_window = $(".portfolio-fullscreen")

        Object.entries(portfoys[cur_lang][$(this).attr("id")]).forEach((element, index) => {
            detail_window.find("#" + element[0]).html(element[1])
            console.log(detail_window.find("#" + element[0]).html());
            console.log(element[0]);
            console.log(element[1]);
        });

        selector.children().each((index, element2) => {
            $(element2).mouseover(function () {
                $(selector_parent).children(":not(.selector)").css("opacity", 0)
                $(selector_parent).children().eq($(element2).index()).css("opacity", 1)
                $(selector_parent).children(".selector").children().css("opacity", 0.5)
                $(element2).css("opacity", 1)

            })
        });

        $("body>.portfolio-fullscreen").on("click", function () {
            $(this).remove();
        }).children().click(function (e) {
            return false;
        });
    })
}