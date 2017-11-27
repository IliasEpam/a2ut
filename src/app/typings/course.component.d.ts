export interface ICourse {
    id: string;
    title: string;
    description: string;
    duration: string;
    date: string;
    isFavorite: boolean;
}

export interface ICourseComponent {  
    course: ICourse;
}
