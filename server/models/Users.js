module.exports = (sequelize, DataTypes) => {
    // creating comments table
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
    });

    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });
    };

    return Users;
}