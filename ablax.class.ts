import { FORBIDDEN_MESSAGE } from "@nestjs/core/guards";

class Ablax {
  constructor(
    private name: string,
    public username: string,
    public level: number
  ) {}

  updateLevel(level: number) {
    this.level = level;
    return { message: `${this.name} successfully updated` };
  }
}

const ablax1 = new Ablax("Alisher", "@rizoqulov897", 10);
const ablax2 = new Ablax("Asadulloh", "@ar_xx1", 12);
const ablax3 = new Ablax("Asadulloh", "@ar_xx1", 12);
