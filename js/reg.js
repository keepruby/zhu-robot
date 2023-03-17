const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
	if (!val) {
		return '账号不能为空'
	}
	const res = await API.exists(val)
	// console.log(res)

	if (res.data) {
		return '账号已被注册'
	}
})
const nicknameValidator = new FieldValidator('txtNickname', function (val) {
	if (!val) {
		return '昵称不能为空'
	}
})
const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
	if (!val) {
		return '密码不能为空'
	}
})
const loginPwdConfirmValidator = new FieldValidator(
	'txtLoginPwdConfirm',
	function (val) {
		if (!val) {
			return '密码不能为空'
		}
		if (val !== loginPwdValidator.input.value) {
			return '与第一次密码不一样'
		}
	}
)

const form = $('.user-form')
form.onsubmit = async function (e) {
	e.preventDefault()
	const result = await FieldValidator.validator(
		loginIdValidator,
		nicknameValidator,
		loginPwdValidator,
		loginPwdConfirmValidator
	)
	if (!result) {
		return
	}

	const formData = new FormData(form) // 传入表单dom，得到一个表单数据对象
	const data = Object.fromEntries(formData.entries())

	const resp = await API.reg(data)
	if (resp.code === 0) {
		alert('注册成功，点击确定，跳转到登录页')
		location.href = './login.html'
	}
}
