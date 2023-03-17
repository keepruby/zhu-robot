const loginIdValidator = new FieldValidator('txtLoginId', function (val) {
	if (!val) {
		return '账号不能为空'
	}
})

const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
	if (!val) {
		return '密码不能为空'
	}
})

const form = $('.user-form')
form.onsubmit = async function (e) {
	e.preventDefault()
	const result = await FieldValidator.validator(
		loginIdValidator,
		loginPwdValidator
	)
	console.log(result)

	if (!result) {
		return
	}

	const formData = new FormData(form) // 传入表单dom，得到一个表单数据对象
	const data = Object.fromEntries(formData.entries())
	console.log(data)
	const resp = await API.login(data)
	console.log(resp)
	if (resp.code === 0) {
		alert('登录成功')
		location.href = './index.html'
	}
}
