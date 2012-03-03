<h1>jQuery addHint Plugin</h1>
<p>A jQuery plugin that adds a tooltip to an element.</p>
<p>With this plugin you can display tooltips on hovering an element. You are not limited to simple texts. You can use HTML formatting even in the title attribute. Or you can generate the content by javascript and pass to the plugin. The content can be aligned to the target’s any edge, and will make sure the popup not goes off-screen.</p>
<p>The popup will not go away as long as you hover the mouse over it, or an input element inside has focus. Will also take care of the touch devices, where no mouse leave event exists, and will fade the popup automatically after 3 seconds (configurable).</p>
<h2>Syntax</h2>
<pre><code>$(layer).addHint(content, { options });</code></pre>
<ul>
	<li><code>content</code> text, html or jQuery element</li>
</ul>
<h5>options:</h5>
<ul>
	<li><code>gap</code> the distance between the two elements' edges</li>
	<li><code>posX</code>, <code>posY</code> reference point of the element to be aligned <code>0 = ALIGN_LEFT</code> or <code>1 = ALIGN_CENTER</code> or <code>2 = ALIGN_RIGHT</code>, <code>0 = ALIGN_TOP</code> or <code>1 = ALIGN_MIDDLE</code> or <code>2 = ALIGN_BOTTOM</code></li>
	<li><code>toX</code>, <code>toY</code> reference point of the target element ( the same as above )</li>
	<li><code>id</code> the class name of the popup element if you wish to style it</li>
	<li><code>css</code> the CSS attributes array { property: 'value', ... } which will replace the default</li>
	<li><code>stay</code> the length the popup should on before goes away on touch devices</li>
</ul>
<h2>Demo</h2>
<p><a href="http://lazaworx.com/static/addhint-plugin/sample.html">http://lazaworx.com/static/addhint-plugin/sample.html</a></p>
<h2>Usage</h2>
<pre><code>// Using the target element's title attribute:
$('.target').addHint();

// Adding custom text, HTML content as argument
$('.target').addHint('Simple &lt;b&gt;HTML&lt;/b&gt; code');

// Adding a jQuery element as argument
var el = $('&lt;div&gt;').text('a jQuery element').css({
	display:'inline-block',
	backgroundColor:'#066', 
	color:'#fff',
	padding:'1em'
}).hide().appendTo('body');

$('.target').addHint(el, { 
	posX: ALIGN_LEFT, 
	posY: ALIGN_MIDDLE,
	toX: ALIGN_RIGHT,
	toY: ALIGN_MIDDLE,
	gap: 0
});
</code></pre>
<h2>Requirements</h2>
<p><a href="http://docs.jquery.com/Downloading_jQuery">jQuery 1.7 or higher</a></p>
<h2>License</h2>
<p>Available for use in all personal or commercial projects under both <a href="MIT-LICENSE.txt">MIT</a> and <a href="GPL-LICENSE.txt">GPL licenses</a>.</p>
<p>Copyright (c) 2012 <a href="http://lazaworx.com">Molnar Laszlo</a></p>
