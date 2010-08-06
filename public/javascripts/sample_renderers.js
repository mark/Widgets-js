register_widget_renderer('pie-graph', function(dom_id, data) {
    var r = Raphael(dom_id);

    r.g.txtattr.font = "12px 'Fontin Sans', Fontin-Sans, sans-serif";

    r.g.text(320, 70, "Static Pie Chart").attr({"font-size": 20});

    r.g.piechart(320, 240, 100, data); 
});