module.exports = {
	// docs: https://www.fastify.io/docs/latest/Routes/
	method: 'GET',
	url: '/test',

	handler: function (request, reply) {
		reply.send({ hello: 'world' });
	},
};
