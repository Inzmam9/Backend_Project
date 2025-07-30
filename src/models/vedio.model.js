import mongoose,{Schema} from "mongoose";
const vedioSchema= new Schema({
    vedioFile : {
        type: String,
        required: true,

    },
      description : {
        type: String,
        required: true,

    },
      thumbNail : {
        type: String,
        required: true,

    },
      title : {
        type: String,
        required: true,

    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",

    },
    isPublished:{
        type: Boolean,
        default: true,

    },
    duration:{
        type: Number,
    },
    views:{
        type: Number,
        default:0,
    },

},{timestamps: true})

vedioSchema.plugin(mongooseAggregatePaginate)
export const Vedio= mongoose.model("Vedio",vedioSchema)