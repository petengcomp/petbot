module.exports = (sequelize, DataTypes) => {
	return sequelize.define('guilds', {
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true,
        },
        topics: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
	}, {
		timestamps: false,
	});
};