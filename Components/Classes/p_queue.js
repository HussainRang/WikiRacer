class priority_queue{

    constructor()
    {
        this.p_q = [];
    }

    enqueue(elem)
    {
        this.p_q.push(elem);
        let index = this.size()-1;

        while(    index!=0    &&    this.p_q[ Math.ceil(index/2) - 1].heuristic < this.p_q[index].heuristic  )
        {
            let temp = this.p_q[index];
            this.p_q[index] = this.p_q[ Math.ceil(index/2) - 1 ];
            this.p_q[ Math.ceil(index/2) - 1 ] = temp;

            index = Math.ceil(index/2) - 1;
        }
    }

    dequeue()
    {
        this.p_q[0] = this.p_q[this.p_q.length-1];
        this.p_q.splice( this.p_q.length-1 , 1 );
        let index=0;
        
        var child;
        while( (2*index+1) < this.p_q.length )
        {
            if( (2*index+2) < this.p_q.length )
            {
                if( this.p_q[2*index+1].heuristic > this.p_q[2*index+2].heuristic ) child = 2*index+1;
                else child = 2*index+2;
            }
            else child = 2*index+1;       

            if(this.p_q[child].heuristic > this.p_q[index].heuristic)
            {
                let temp = this.p_q[index];
                this.p_q[index] = this.p_q[child];
                this.p_q[child] = temp;  
                index = child;
            }
            else break;

        }
    }

    peek()
    {
        return this.p_q[0];
    }

    size()
    {
        return this.p_q.length;
    }

};

module.exports = {priority_queue};

// Left Child = 2*index + 1
// Right Child = 2*index + 2
// Parent = ceil(i/2)-1