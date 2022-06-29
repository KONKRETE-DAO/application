module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            value: String,
            name: String,
            email: String,
            usageCount: Number,
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Code = mongoose.model("code", schema);
    return Code;
};