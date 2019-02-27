function run() {
    var text = document.getElementById('sourceTA').value,
        target = document.getElementById('targetDiv'),
        converter = new showdown.Converter({smoothPreview: true}),
        html = converter.makeHtml(text);

    target.innerHTML = html;
    hljs.highlightBlock(target);
}