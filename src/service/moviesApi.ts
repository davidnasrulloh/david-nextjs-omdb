import olympic from "./olympic";

export const getSearchMovies = async ({
    pageParam,
    searchQuery,
    type,
}: {
    pageParam: number;
    searchQuery: string;
    type: string;
}) => {
    try {
        let url = `/?apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}&`;

        if (type) url += `type=${type}&`;
        if (pageParam) url += `page=${pageParam}&`;
        if (searchQuery) url += `s=${searchQuery}&`;

        const response = await olympic.get(url);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getDetailsMovies = async ({ id }: { id: string }) => {
    try {
        const url = `/?apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}&i=${id}&`;

        const response = await olympic.get(url);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};
