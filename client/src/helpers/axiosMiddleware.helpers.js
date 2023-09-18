export default {
	responseFulfilled: (response) => {
		return response;
	},
	responseRejected: (error) => {
		return error;
	},
	requestFulfilled: (request) => {
		request.headers["X-Requested-With"] = "XMLHttpRequest";
		return request;
	},
	requestRejected: (error) => {
		return error;
	},
};
