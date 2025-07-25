import 'https://wbwdxh.github.io/anchor.min.js';

/*--start; form katex: copy-tex--*/
;// CONCATENATED MODULE: ./contrib/copy-tex/katex2tex.js
// Set these to how you want inline and display math to be delimited.
const defaultCopyDelimiters = {
	inline: ['$', '$'],
	// alternative: ['\(', '\)']
	display: ['$$', '$$'] // alternative: ['\[', '\]']

}; // Replace .katex elements with their TeX source (<annotation> element).
// Modifies fragment in-place.  Useful for writing your own 'copy' handler,
// as in copy-tex.js.

function katexReplaceWithTex(fragment, copyDelimiters) {
	if (copyDelimiters === void 0) {
		copyDelimiters = defaultCopyDelimiters;
	}

	// Remove .katex-html blocks that are preceded by .katex-mathml blocks
	// (which will get replaced below).
	const katexHtml = fragment.querySelectorAll('.katex-mathml + .katex-html');

	for (let i = 0; i < katexHtml.length; i++) {
		const element = katexHtml[i];

		if (element.remove) {
			element.remove();
		} else if (element.parentNode) {
			element.parentNode.removeChild(element);
		}
	} // Replace .katex-mathml elements with their annotation (TeX source)
	// descendant, with inline delimiters.


	const katexMathml = fragment.querySelectorAll('.katex-mathml');

	for (let i = 0; i < katexMathml.length; i++) {
		const element = katexMathml[i];
		const texSource = element.querySelector('annotation');

		if (texSource) {
			if (element.replaceWith) {
				element.replaceWith(texSource);
			} else if (element.parentNode) {
				element.parentNode.replaceChild(texSource, element);
			}

			texSource.innerHTML = copyDelimiters.inline[0] + texSource.innerHTML + copyDelimiters.inline[1];
		}
	} // Switch display math to display delimiters.


	const displays = fragment.querySelectorAll('.katex-display annotation');

	for (let i = 0; i < displays.length; i++) {
		const element = displays[i];
		element.innerHTML = copyDelimiters.display[0] + element.innerHTML.substr(copyDelimiters.inline[0].length, element.innerHTML.length - copyDelimiters.inline[0].length - copyDelimiters.inline[1].length) + copyDelimiters.display[1];
	}

	return fragment;
}
/* harmony default export */ var katex2tex = (katexReplaceWithTex);
/*--end--*/

document.html = document.head.parentElement;
const topHref = ".";
const LiteMarkster = {
	changeTitle(title) {
		document.title = title + ` | ${this.find(this.app, "app-name") || 'LiteMarkster'}`;
	},
	app: document.getElementById("app"),
	find(e, str) {
		return e.getAttribute(str);
	},
	set(e, str, data) {
		return e.setAttribute(str, data);
	},
	loadStyle(url) {
		let tmp = document.createElement("link");
		this.set(tmp, "rel", "stylesheet");
		this.set(tmp, "href", url);
		document.head.append(tmp);
		return tmp;
	},
	async loadScriptAsync(url) {
		return new Promise((resolve, reject) => {
			let tmp = document.createElement("script");
			this.set(tmp, "src", url);
			tmp.onload = () => resolve(tmp);
			tmp.onerror = reject;
			document.head.append(tmp);
		});
	},
	async loadStyleAsync(url) {
		return new Promise((resolve, reject) => {
			let tmp = document.createElement("link");
			this.set(tmp, "rel", "stylesheet");
			this.set(tmp, "href", url);
			tmp.onload = () => resolve(tmp);
			tmp.onerror = reject;
			document.head.append(tmp);
		});
	},
	loadScript(url, after = () => { }) {
		let tmp = document.createElement("script");
		this.set(tmp, "src", url);
		tmp.onload = after;
		document.head.append(tmp);
		return tmp;
	},
	footer: document.createElement("footer"),
	getJSON(url) {
		return fetch(url)
			.then(res => {
				if (!res.ok) throw new Error("Network response was not ok");
				return res.json();
			})
			.catch(() => ({}));
	},
	async run(code) {
		async function f(params) {
			await params();
		}
		return new Promise(async (resolve, reject) => {
			await f(code);
			resolve();
		});
	}
};
document.head.append((() => {
	let tmp = document.createElement("meta");
	LiteMarkster.set(tmp, "name", "viewport");
	LiteMarkster.set(tmp, "content", "width=device-width, initial-scale=1.0");
	return tmp;
})());
LiteMarkster.changeTitle(LiteMarkster.find(LiteMarkster.app, "app-title"));
LiteMarkster.loadStyle("./style.css");
LiteMarkster.loadScript("https://wbwdxh.github.io/jquery-3.3.1.min.js");
document.body.append(LiteMarkster.footer);
LiteMarkster.footer.innerHTML = LiteMarkster.find(LiteMarkster.app, "app-footer") || `<p>版权所有© 2025 ${LiteMarkster.find(LiteMarkster.app, "app-name") || 'LiteMarkster'}</p><p>非代码（如文档）部分使用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a> 许可协议，代码部分使用 <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">GPLv3</a> 许可协议</p>`;

const codeStyle = () => {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	const darkCssHref = "https://wbwdxh.github.io/highlight/styles/github-dark.min.css";
	const lightCssHref = "https://wbwdxh.github.io/highlight/styles/github.min.css";
	let highlightLink = document.getElementById("highlight-theme-css");
	if (!highlightLink) {
		highlightLink = document.createElement("link");
		highlightLink.rel = "stylesheet";
		highlightLink.id = "highlight-theme-css";
		document.head.appendChild(highlightLink);
	}
	if (currentTheme == 'dark') {
		highlightLink.href = darkCssHref;
	} else {
		highlightLink.href = lightCssHref;
	}
};

window.changeStyle = () => {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	if (currentTheme === 'dark') {
		document.documentElement.removeAttribute('data-theme');
		localStorage.setItem('theme', 'light');
		document.getElementById('dark-mode-toggle').textContent = '🌙';
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
		document.getElementById('dark-mode-toggle').textContent = '☀️';
	}
	codeStyle();
};

function addHeader() {
	let tmp = document.createElement("header");
	tmp.style = `margin: 0; position: sticky; top:0; left: 0; width: 100%;
		z-index: 9999; padding: 10px 0;border-bottom: 1px solid #eee;
		background-color: #fffc;/* backdrop-filter: blur(.5px);*/`;
	tmp.innerHTML = `
<!-- 进度条 -->
<div id="top-progress-bar" style="position: fixed; top: 0px; left: 0px; right: 0px;
		background-color: lightskyblue; height: 2px; width: 0%;
		transition: width 0.2s ease 0s, opacity 0.6s ease 0s;">
</div>
<ul style="height: 100%; list-style-type: none; display: flex;
	flex-direction: row; justify-content: flex-start; padding: 0; margin: 0;">
	<li style="height: 100%; margin-inline: 1em;">
		<a href="${topHref}/index.html">首页</a>
	</li>
	<li style="height: 100%; margin-inline: 1em;">
		<a href="${topHref}/tools.html">工具</a>
	</li>
	<li style="height: 100%; margin-inline: 1em;">
		<a href="${topHref}/about.html">关于</a>
	</li>
	<!-- In the header section, add this after the existing list items -->
	<li style="height: 100%; margin-inline: 1em;">
		<button id="dark-mode-toggle" style="background: none; border: none; cursor: pointer; font-size: 1em;" onclick="window.changeStyle()">
			🌙
		</button>
	</li>
</ul>`;
	document.body.insertBefore(tmp, document.body.children[0]);
	// Check for saved theme preference or use system preference
	const savedTheme = localStorage.getItem('theme');
	const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	// Set initial theme
	if (savedTheme === 'dark') {
		document.documentElement.setAttribute('data-theme', 'dark');
		document.getElementById('dark-mode-toggle').textContent = '☀️';
	}
	codeStyle();
}

addHeader();

document.addEventListener('scroll', function () {
	function getScrollPercentage() {
		// 获取页面滚动的垂直位置
		var scrollTop = window.pageYOffset ||
			document.documentElement.scrollTop || document.body.scrollTop || 0;

		// 获取页面的总高度
		var scrollHeight = document.documentElement.scrollHeight;
		var clientHeight = window.innerHeight ||
			document.documentElement.clientHeight;

		// 计算滚动位置占页面高度的百分比
		var scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

		return scrollPercent;
	}
	//设置#top-progress-bar的宽度为滚动百分比
	document.getElementById('top-progress-bar').style.width =
		Math.round(getScrollPercentage()) + '%';
});

LiteMarkster.marker = () => {
	LiteMarkster.run(async () => {
		if (LiteMarkster.find(LiteMarkster.app, "app-md") === "true") {
			var markedjs;
			await import('https://wbwdxh.github.io/marked.js').then(async ({ marked }) => {
				if (marked) {
					document.querySelectorAll('pre.md').forEach(pre => {
						// 先从原始 Markdown 文本中提取所有脚注
						// 只处理非代码块内的脚注
						// 先将代码块内容替换为占位符，渲染后再还原
						let md = pre.textContent;
						const codeBlocks = [];
						md = md.replace(/```[\s\S]*?```/g, (m) => {
							codeBlocks.push(m);
							return `\uE000CODEBLOCK${codeBlocks.length - 1}\uE001`;
						});
						md = md.replace(/`[^\n\r`]*?`/g, (m) => {
							codeBlocks.push(m);
							return `\uE000CODEBLOCK${codeBlocks.length - 1}\uE001`;
						});
						const footnoteRegex = /\[\^([^\]]+)\]:\s*([\s\S]+?)(?=\n{2,}|\n*$)/g;
						let footnotes = [];
						let mainHtml = '';
						// let md = pre.textContent;
						md = md.replace(footnoteRegex, (m, name, content) => {
							footnotes.push({ name, content: content.replace(/^\s+|\s+$/g, '').replace(/\n {2}/g, '<br />') });
							return '';
						});
						// 替换正文中的 [^name] 为上标链接
						md = md.replace(/\[\^([^\]]+)\]/g, (m, name) => {
							const idx = footnotes.findIndex(f => f.name === name);
							if (idx !== -1) {
								return `<sup id="fnref:${name}"><a href="#fn:${name}" title="查看脚注">${idx + 1}</a></sup>`;
							}
							return m;
						});
						// 添加脚注内容到结尾
						if (footnotes.length) {
							mainHtml += `<section class="footnotes"><ol>` +
								footnotes.map((f, i) => {
									let tmp = marked.parse(f.content);
									if (tmp.startsWith('<p>') || tmp.endsWith('</p>')) {
										tmp = tmp.slice(3, -5);
									}
									return `<li id="fn:${f.name}">${tmp.replace(/\uE000CODEBLOCK(\d+)\uE001/g, (m, idx) => {
										let tmp = marked.parse(codeBlocks[idx]);
										if (tmp.startsWith('<p>') || tmp.endsWith('</p>')) {
											tmp = tmp.slice(3, -5);
										}
										return tmp;
									})} <a href="#fnref:${f.name}" title="返回正文">↩</a></li>`
								}).join('') +
								`</ol></section>`;
						}
						md = md.replace(/\uE000CODEBLOCK(\d+)\uE001/g, (m, idx) => {
							let tmp = marked.parse(codeBlocks[idx]);
							if (tmp.startsWith('<p>') || tmp.endsWith('</p>')) {
								tmp = tmp.slice(3, -5);
							}
							return tmp;
						});
						const html = marked(md);
						mainHtml = html + mainHtml;
						pre.outerHTML = mainHtml;
					});
				}
				else {
					console.error("Can't found the marked.js");
				}
				markedjs = marked;
				let lscnt = 0;
				function f1() {
					if (++lscnt < 2)
						return;
					try {
						renderMathInElement(document.body, {
							delimiters: [
								{ left: '\\(', right: '\\)', display: true },
								{ left: '$$', right: '$$', display: true },
								{ left: '$', right: '$', display: false },
							],
						});
					} catch (e) {
						console.error(e);
					}

					hljs.highlightAll();//高亮代码
					hljs.documentReady();

					function fun() {
						// 获取所有的 <pre><code>...</code></pre> 元素
						var preElements = document.querySelectorAll('pre code');

						// 遍历这些元素
						preElements.forEach(function (codeElement) {
							// 创建复制按钮
							var button = document.createElement('button');
							button.textContent = '复制';
							button.classList.add('codecopy-btn'); // 添加类以便样式化

							// 将按钮添加到 code 元素的父元素（即 pre 元素）中
							var div = document.createElement('div');
							div.style = "width:100%;position: relative;";
							div.appendChild(button);
							codeElement.before(div);
							codeElement.parentElement.classList.add("hljs-prt");

							let x = codeElement;

							// 使用 Clipboard.js 初始化复制功能
							let clipboard = new ClipboardJS(button, {
								text: function (trigger) {
									// 返回要复制的文本
									return x.innerText.replace(/\n\n/g, "\n");
								}
							});

							clipboard.on('success', function (e) {
								console.log('复制成功！', e);
								// 可以在这里修改按钮的文本或样式来表示成功
								e.clearSelection(); // 清除选区
								e.trigger.textContent = '复制成功';
								setTimeout(() => {
									e.trigger.textContent = '复制';
								}, 500);
							});

							clipboard.on('error', function (e) {
								console.error('复制失败！', e);
								// 可以在这里处理错误
								e.trigger.textContent = '复制失败';
								setTimeout(() => {
									e.trigger.textContent = '复制';
								}, 500);
							});
						});
					}
					fun();
				}

				// 使用 Promise 链解决回调地狱
				const loadScript = url => new Promise((resolve, reject) => {
					LiteMarkster.loadScript(url, () => resolve());
				});
				const loadAll = async () => {
					(async () => {
						await LiteMarkster.loadStyleAsync("https://wbwdxh.github.io/katex/katex.min.css");
						await loadScript("https://wbwdxh.github.io/katex/katex.min.js");
						// await loadScript("https://wbwdxh.github.io/katex/contrib/copy-tex.min.js");
						await loadScript("https://wbwdxh.github.io/katex/contrib/auto-render.min.js");
						f1();
					})();
					(async () => {
						await loadScript("https://wbwdxh.github.io/highlight/highlight.min.js");
						await loadScript("https://wbwdxh.github.io/highlight/highlightjs-line-numbers.js");
						await loadScript("https://wbwdxh.github.io/codecopy/clipboard.js");
						f1();
					})();
				};
				await loadAll();

				// 支持 GitHub 风格的 Markdown 颜色可视化
				// 仅处理 <code> 标签内的 HEX/RGB/HSL/RGBA 颜色
				document.querySelectorAll('code').forEach(code => {
					const text = code.textContent;
					// HEX: #RRGGBB
					const hexMatch = text.match(/^#([0-9a-fA-F]{6})$/) || text.match(/^#([0-9a-fA-F]{3})$/) || text.match(/^#([0-9a-fA-F]{4})$/) || text.match(/^#([0-9a-fA-F]{8})$/);
					// RGB: rgb(R,G,B)
					const rgbMatch =
						text.match(/^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/) ||
						text.match(/^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/);
					// HSL: hsl(H,S,L)
					const hslMatch = text.match(/^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/);
					let color = null;
					if (hexMatch) color = hexMatch[0];
					else if (rgbMatch) color = rgbMatch[0];
					else if (hslMatch) color = hslMatch[0];
					if (color) {
						const circle = document.createElement('span');
						circle.className = "color";
						circle.style.display = 'inline-block';
						circle.style.verticalAlign = 'middle';
						circle.style.width = '1em';
						circle.style.height = '1em';
						circle.style.marginRight = '0.3em';
						circle.style.borderRadius = '50%';
						circle.style.background = circle.title = color;
						code.parentNode.insertBefore(circle, code);
					}
				});
			});
			window.marked = markedjs;
		}


		if (LiteMarkster.find(LiteMarkster.app, "app-anchors") === "true") {
			anchors.add();
		}

		class GEmoji extends HTMLElement {
			constructor() {
				super();
			}
			connectedCallback() {
				const alias = this.getAttribute('alias');
				const title = this.getAttribute('title') || alias;
				const src = this.getAttribute('src');
				this.setAttribute('role', 'img');
				this.setAttribute('aria-label', alias);
				this.setAttribute('title', title);
				this.style.display = 'inline-block';
				this.style.width = '1em';
				this.style.height = '1em';
				this.style.verticalAlign = 'middle';
				this.style.backgroundRepeat = 'no-repeat';
				this.style.backgroundSize = '1em 1em';
				this.style.backgroundPosition = 'center';
				if (src && window.emojiMap && window.emojiMap[alias]) {
					this.style.backgroundImage = `url(${window.emojiMap[alias]})`;
					this.style.userSelect = 'text';
					this.style.color = 'transparent';
					this.innerHTML = `&emsp;`;
				} else {
					this.textContent = `:${alias}:`;
				}
			}
		}
		customElements.define('g-emoji', GEmoji);
		function myclosest(node, e = '.katex') {
			const element = node instanceof Element ? node : node.parentElement;
			return element && element.closest(e);
		}
		document.addEventListener('copy', function (event) {
			const selection = window.getSelection();
			console.log(selection)
			if (selection.isCollapsed || !event.clipboardData) {
				return;
			}
			const clipboardData = event.clipboardData;
			const range = selection.getRangeAt(0);
			const start = myclosest(range.startContainer);
			if (start) {
				range.setStartBefore(start);
			}
			const end = myclosest(range.endContainer);
			if (end) {
				range.setEndAfter(end);
			}
			const fragment = range.cloneContents();
			if (!fragment.querySelector('g-emoji') && !fragment.querySelector('.katex')) {
				return;
			}
			const htmlContents = Array.prototype.map.call(fragment.childNodes, el => el instanceof Text ? el.textContent : el.outerHTML).join('');
			// 将 fragment 中的所有 g-emoji 元素替换为 :alias: 文本
			Array.from(fragment.querySelectorAll('g-emoji')).forEach(el => {
				const alias = el.getAttribute('alias');
				const textNode = document.createTextNode(`:${alias}:`);
				el.parentNode.replaceChild(textNode, el);
			});
			clipboardData.setData('text/html', htmlContents);
			clipboardData.setData('text/plain', katex2tex(fragment).textContent);
			event.preventDefault();
		});
	}).then(async () => {
		/* 支持 :emoji: 语法渲染为 GitHub 风格表情符号 */
		if (LiteMarkster.find(LiteMarkster.app, "app-emoji") === "true") {
			await LiteMarkster.getJSON('https://api.github.com/emojis').then(async (data) => {
				window.emojiMap = data;
			}).then(() => {
				const emojiMap = window.emojiMap;
				const tmp = ['p', 'em', 'strong', 'li', 'th', 'tb', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '.emoji'];
				for (let i = 0; i < tmp.length; i++) {
					document.querySelectorAll(tmp[i]).forEach((container) => {
						// 替换子元素为占位符，防止 :emoji: 匹配到子元素内容
						const childNodes = Array.from(container.childNodes);
						const placeholders = [];
						childNodes.forEach((node, idx) => {
							if (node.nodeType !== Node.TEXT_NODE) {
								const placeholder = `\uE000CHILDNODE${idx}\uE001`;
								placeholders.push({ idx, node, placeholder });
								container.replaceChild(document.createTextNode(placeholder), node);
							}
						});
						container.innerHTML = container.innerHTML.replace(/:([a-zA-Z0-9_\-\+]+):/g, (m, code) => {
							if (emojiMap[code]) {
								return `<g-emoji alias="${code}" title="${code}" src="https://api.github.com/emojis"></g-emoji>`;
							}
							return m;
						});
						placeholders.forEach(({ idx, node, placeholder }) => {
							container.innerHTML = container.innerHTML.replace(placeholder, node.outerHTML);
						});
					});
					console.log(`${tmp[i]}'s emojis loaded!`);
				}
			});
		}
		if (LiteMarkster.find(LiteMarkster.app, "app-emoji-pro") === "true") {
			await LiteMarkster.getJSON('emoji.json').then(async (data) => {
				window.proEmojiMap = data;
			}).then(() => {
				const emojiMap = window.proEmojiMap;
				const tmp = ['p', 'em', 'strong', 'li', 'th', 'tb', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '.emoji'];
				for (let i = 0; i < tmp.length; i++) {
					document.querySelectorAll(tmp[i]).forEach((container) => {
						// 替换子元素为占位符，防止 :emoji: 匹配到子元素内容
						const childNodes = Array.from(container.childNodes);
						const placeholders = [];
						childNodes.forEach((node, idx) => {
							if (node.nodeType !== Node.TEXT_NODE) {
								const placeholder = `\uE000CHILDNODE${idx}\uE001`;
								placeholders.push({ idx, node, placeholder });
								container.replaceChild(document.createTextNode(placeholder), node);
							}
						});
						container.innerHTML = container.innerHTML.replace(/:([a-zA-Z0-9_\-\+]+):/g, (m, code) => {
							if (emojiMap[code]) {
								return emojiMap[code];
							}
							return m;
						});
						placeholders.forEach(({ idx, node, placeholder }) => {
							container.innerHTML = container.innerHTML.replace(placeholder, node.outerHTML);
						});
					});
					console.log(`${tmp[i]}'s pro-emojis loaded!`);
				}
			});
		}
	});
};
if (LiteMarkster.find(LiteMarkster.app, "app-auto-mark") === "true") {
	LiteMarkster.marker();
}