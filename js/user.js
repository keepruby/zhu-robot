/**
 *对某一个表单单独验证的构造函数
 *
 * @class FieldValidator
 */
class FieldValidator {
	/**
	 * 构造器
	 * @param {*} domId   文本框的ID
	 * @param {*} validatorFunc    验证处理的函数
	 *
	 */
	constructor(domId, validatorFunc) {
		this.input = $('#' + domId)
		this.p = this.input.nextElementSibling
		this.validatorFunc = validatorFunc
		this.input.onblur = () => {
			this.validate()
		}
	}
	async validate() {
		const err = await this.validatorFunc(this.input.value)
		if (err) {
			this.p.innerHTML = err
			return false
		} else {
			this.p.innerText = ''
			return true
		}
	}
	static async validator(...validators) {
		const result = validators.map((e) => e.validate())
		const proms = await Promise.all(result)
		return proms.every((e) => e)
	}
}

// function test() {
// 	FieldValidator.validator(nicknameValidator, loginIdValidator).then(
// 		(res) => {
// 			console.log(res)
// 		}
// 	)
// }
