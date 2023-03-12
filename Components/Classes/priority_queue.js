class priority_queue{

    constructor()
    {
        this.p_q = [];
    }

    enqueue(links_arr_and_heuristic_obj)
    {
        // The argument should not be undefined
        let is_links_arr_and_heuristic_obj_undefined = typeof links_arr_and_heuristic_obj === 'undefined' ? true : false ;

        // the argument should be an object
        let is_links_arr_and_heuristic_obj_an_object = (!is_links_arr_and_heuristic_obj_undefined && 
                                                         typeof links_arr_and_heuristic_obj === 'object') ? true : false ;
     
        // links_arr should be array 
        let is_links_Arr_present_and_an_array = (is_links_arr_and_heuristic_obj_an_object &&
                                                links_arr_and_heuristic_obj["links_arr"] instanceof Array) ? true : false ;
                
        // heuristic should be a number
        let is_heuristic_present_and_number = (is_links_arr_and_heuristic_obj_an_object && 
                                                typeof links_arr_and_heuristic_obj['heuristic'] === 'number') ? true : false ;
            
        // links_arr should not be empty
        let is_links_arr_empty = (is_links_Arr_present_and_an_array &&  links_arr_and_heuristic_obj["links_arr"].length===0) ? true : false ;
        
        // links_Arr and heuristic should only be present in the object
        let links_arr_and_heuristic_present_only = (is_links_Arr_present_and_an_array &&
                                                    is_heuristic_present_and_number &&
                                                    Object.keys(links_arr_and_heuristic_obj).length===2) ? true : false ;

        // are all of the above conditions satisfied
        let conditions_satisfied = (!is_links_arr_and_heuristic_obj_undefined && 
                                    is_links_arr_and_heuristic_obj_an_object && 
                                    is_links_Arr_present_and_an_array && 
                                    is_heuristic_present_and_number &&
                                    !is_links_arr_empty && 
                                    links_arr_and_heuristic_present_only);
        
        // Throwing error if conditions not satisfied
        if (  !conditions_satisfied  ) 
        {
            throw new Error('Wrong arguments provided to enqueue function');
        }

        // ENQUEUEING OBJECT
        this.p_q.push(links_arr_and_heuristic_obj);
        
        let child_index = this.p_q.length-1;
        let parent_index = (Math.ceil(child_index/2) - 1);

        while( child_index!=0    &&    this.p_q[parent_index].heuristic < this.p_q[child_index].heuristic )
        {
            let temp = this.p_q[ child_index ];
            this.p_q[ child_index ] = this.p_q[ parent_index ];
            this.p_q[ parent_index ] = temp;

            child_index = parent_index;
            parent_index = (Math.ceil(child_index/2) - 1);
        }

    }



    dequeue()
    {
        if(this.p_q.length===0)throw new Error('The priority queue is empty !!!!');
        
        this.p_q[0] = this.p_q[this.p_q.length-1];
        this.p_q.splice( this.p_q.length-1 , 1 );
        let parent_index=0;
        
        let left_child_index = 2*parent_index + 1;
        while( (left_child_index) < this.p_q.length )
        {
            let right_child_index = 2*parent_index+2;
            let does_right_child_exists = right_child_index < this.p_q.length;
            
            let selected_child_index; 
            if( does_right_child_exists )
            {
                let left_child_heuristic = this.p_q[left_child_index].heuristic;
                let right_child_heuristic = this.p_q[right_child_index].heuristic;
                if( left_child_heuristic > right_child_heuristic ) selected_child_index = left_child_index;
                else selected_child_index = right_child_index;
            }
            else selected_child_index = left_child_index;       

            let selected_child_heuristic = this.p_q[selected_child_index].heuristic
            let parent_heuristic = this.p_q[parent_index].heuristic; 
            if( selected_child_heuristic > parent_heuristic )
            {
                let temp = this.p_q[parent_index];
                this.p_q[parent_index] = this.p_q[selected_child_index];
                this.p_q[selected_child_index] = temp;  
                parent_index = selected_child_index;
            }
            else break;

        }
    }


    peek()
    {
        if(this.p_q.length!==0) return this.p_q[0];
        else throw new Error('The priority queue is empty !!!!');
    }


    p_q_Array()
    {
        return this.p_q;
    }


    isEmpty()
    {
        if(this.p_q.length===0) return true;
        else return false;
    }
    
    
    size()
    {
        return this.p_q.length;
    }
    
    
    prevent_overflow(index)
    {
        if(index>1000)
        {   
            this.p_q.splice( this.p_q.length-1 , 1 );
            index = index - 1;
        }
        return index;
    }


};


module.exports = priority_queue;


// Left Child = 2*index + 1
// Right Child = 2*index + 2
// Parent = ceil(i/2)-1

