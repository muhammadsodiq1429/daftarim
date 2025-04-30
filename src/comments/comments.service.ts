import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectModel } from "@nestjs/sequelize";

import { Comment } from "../comments/models/comment.model";

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}
  async create(createCommentDto: CreateCommentDto) {
    const newComment = await this.commentModel.create(createCommentDto);

    return newComment;
  }

  async findAll() {
    const allComment = await this.commentModel.findAll();
    if (allComment.length === 0)
      throw new NotFoundException("Comment not found");

    return allComment;
  }

  async findOne(id: number) {
    const comment = await this.commentModel.findByPk(id);
    if (!comment) throw new NotFoundException("Comment not found");

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOne(id);
    await comment.update(updateCommentDto);

    return { message: "Comment successfully updated", comment };
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    await comment.destroy();

    return { message: "Comment successfully deleted", id };
  }
}
