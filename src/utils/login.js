
function myAsyncFunc() {
	return new Promise(function (resolve) {
		setTimeout(function () {
			console.log('myAsyncFunction done!');
			resolve({data: 'Hello,World'});
		}, 5000);
	});
}

const login = async () => {
	var result = await myAsyncFunc();
	console.log(result.data);
};

export {login};
