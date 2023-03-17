;(async function () {
	const resp = await API.profile()
	const user = resp.data
	const doms = {
		aside: {
			nickname: $('#nickname'),
			loginId: $('#loginId'),
		},
		close: $('.close'),
		chatContainer: $('.chat-container'),
		txtMsg: $('#txtMsg'),
		msgContainer: $('.msg-container'),
	}

	if (!user) {
		alert('未登录或登录已过期，请重新登录')
		location.href = './login.html'
		return
	}
	setUserInfo()
	await getHistory()
	//获取历史记录
	async function getHistory() {
		const resp = await API.getHistory()
		console.log(resp)

		for (const item of resp.data) {
			addChar(item)
		}
		scrollBottom()
	}
	function setUserInfo() {
		doms.aside.nickname.innerText = user.nickname
		doms.aside.loginId.innerText = user.loginId
	}
	function scrollBottom() {
		doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight
	}
	// getHistory()
	/**
    *                <div class="chat-item me">
                    <img class="chat-avatar" src="./asset/avatar.png" />
                    <div class="chat-content">你几岁啦？</div>
                    <div class="chat-date">2022-04-29 14:18:13</div>
                </div>
                <div class="chat-item">
                    <img class="chat-avatar" src="./asset/robot-avatar.jpg" />
                    <div class="chat-content">讨厌，不要随便问女生年龄知道不</div>
                    <div class="chat-date">2022-04-29 14:18:16</div>
                </div>
    *
    */
	function addChar(info) {
		const div = $$$('div')
		div.classList.add('chat-item')
		if (info.from) {
			div.classList.add('me')
		}
		const img = $$$('img')
		img.className = 'chat-avatar'
		img.src = info.from ? './asset/avatar.png' : './asset/robot-avatar.jpg'
		const content = $$$('div')
		content.className = 'chat-content'
		content.innerText = info.content
		const date = $$$('div')
		date.className = 'chat-date'
		date.innerText = moment(info.createdAt).format('YYYY-MM-DD HH:mm:ss')

		div.appendChild(img)
		div.appendChild(content)
		div.appendChild(date)
		doms.chatContainer.appendChild(div)
	}
	async function sendChat() {
		const content = doms.txtMsg.value.trim()
		if (!content) {
			return
		}
		addChar({
			from: user.loginId,
			to: null,
			createdAt: Date.now(),
			content,
		})
		doms.txtMsg.value = ''
		scrollBottom()
		const resp = await API.sendChat(content)
		addChar({
			from: null,
			to: user.loginId,
			...resp.data,
		})
		scrollBottom()
	}
	doms.msgContainer.onsubmit = function (e) {
		e.preventDefault()
		sendChat()
	}
	doms.close.onclick = function () {
		API.loginOut() // 退出登录
		location.href = './login.html' // 跳转到登录页
	}
})()
