module.exports = (sequelize, DataTypes) => {
	return sequelize.define('guilds', {
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true,
        },
		meeting: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		voteTime: {
			type:  DataTypes.INTEGER,
			defaultValue: 15
		}
	}, {
		timestamps: false,
	});
};