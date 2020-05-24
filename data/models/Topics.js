module.exports = (sequelize, DataTypes) => {
	return sequelize.define('topics', {
		topic: {
            type: DataTypes.STRING
        }
	}, {
		timestamps: false,
	});
};