/* =========================================================================
   sidenotes.js — promote kramdown markdown footnotes into Tufte sidenotes.

   You write standard markdown footnotes in your posts:

       AI agents have found product-market fit at the level of code.[^pmf]

       [^pmf]: Simon Willison has written about this.

   Kramdown renders an inline <sup id="fnref:pmf"><a href="#fn:pmf">1</a></sup>
   plus a <div class="footnotes"><ol><li id="fn:pmf">…</li></ol></div> at the
   bottom of the post. That bottom list is what RSS readers and no-JS browsers
   see — it always works.

   On screens >= 1000px, this script copies each footnote up next to its
   reference, floated into the right margin, and hides the bottom list. No
   special markup is required in the post. Re-runs on resize.
   ========================================================================= */
(function () {
  var MQ = window.matchMedia('(min-width: 1000px)');

  function init() {
    var content = document.querySelector('.post-content');
    if (!content) return;
    var list = content.querySelector('.footnotes');
    if (!list) return;

    var notes = list.querySelectorAll('ol > li');

    function clearGenerated() {
      var gen = content.querySelectorAll('.sidenote.gen');
      for (var i = 0; i < gen.length; i++) gen[i].parentNode.removeChild(gen[i]);
    }

    function build() {
      clearGenerated();

      if (!MQ.matches) { list.style.display = ''; return; }

      for (var i = 0; i < notes.length; i++) {
        var li = notes[i];
        var id = li.getAttribute('id');               // e.g. "fn:pmf"
        if (!id) continue;
        var refId = id.replace(/^fn:/, 'fnref:');      // -> "fnref:pmf"
        var ref = content.querySelector('[id="' + refId + '"]');
        if (!ref) continue;
        var anchor = ref.closest ? (ref.closest('sup') || ref) : ref;

        // copy the note HTML, minus kramdown's back-reference arrow
        var html = li.innerHTML.replace(
          /\s*<a [^>]*class="reversefootnote"[^>]*>[\s\S]*?<\/a>/i, ''
        );

        var note = document.createElement('span');
        note.className = 'sidenote gen';
        // number matches the inline marker
        var num = (ref.textContent || (i + 1)).toString().trim();
        note.innerHTML = '<sup class="sn-num">' + num + '</sup> ' + html;

        anchor.parentNode.insertBefore(note, anchor.nextSibling);
      }
      list.style.display = 'none';
    }

    build();
    if (MQ.addEventListener) MQ.addEventListener('change', build);
    else if (MQ.addListener) MQ.addListener(build);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
