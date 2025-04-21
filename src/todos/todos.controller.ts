import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

interface Todo{
    id:number;
    text: string;
    done: boolean;
}

@Controller('todos')
export class TodosController {
    private todos:Todo[] = [];
    private idCounter = 1;

    @Get()
    getTodos() {
        return this.todos;
    }


    @Post()
    addTodo(@Body('text') text: string) {
      const newTodo: Todo = {
        id: this.idCounter++,
        text,
        done: false,
      };
      this.todos.push(newTodo);
      return { message: 'เพิ่มเรียบร้อย', todo: newTodo };
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string){
        const idNum = parseInt(id);

        const index = this.todos.findIndex(todo => todo.id === idNum);

        if( index === -1){
            return {message: 'ไม่พลรายการที่จะลบ'};

        }

        this.todos.splice(index, 1);

        return {message: 'ลบสำเร็จ'};
    }

    @Put(':id')
    updateTodo(@Param('id') id: string, @Body('text') text: string){
        const idNum = parseInt(id);

        const todo = this.todos.find(t => t.id === idNum);

        if(!todo){
            return {message: 'ไม่พบรายการที่จะแก้ไข'};
        }

        todo.text = text;

        return {message: 'แก้ไขเรียบร้อย', todo};
        }
    

    @Put(':id/done')
    toggleDone(@Param('id') id: string, @Body('done') done: boolean){
        const idNum = parseInt(id);

        const todo = this.todos.find(t => t.id === idNum);

        if(!todo){
            return {message: 'ไม่พบรายการที่ต้องการทำให้เสร็จ'};
        }

        todo.done = done;

        return {message: done ? 'ทำรายการสำเร็จ' :  'ย้อนกลับเป็นยังไม่เสร็จ', todo};
    }
}

    


