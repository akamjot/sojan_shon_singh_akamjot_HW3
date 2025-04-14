document.addEventListener('DOMContentLoaded', () => {

    // MOVIES SECTION
    const movieAppElement = document.querySelector("#app");
    if (movieAppElement) {
        const app = Vue.createApp({
            data() {
                return {
                    movies: [],
                    title: "",
                    short_description: "",
                    poster: "",
                    director: "",
                    error: "",
                    loadingMovies: true,
                    loading: false
                };
            },
            created() {
                fetch("http://localhost/movies-api/public/movies")
                    .then(response => {
                        if (!response.ok) throw new Error("Failed to fetch movie list.");
                        return response.json();
                    })
                    .then(data => {
                        this.movies = data;
                        this.loadingMovies = false;
                    })
                    .catch(error => {
                        this.error = "Failed to load movie list.";
                        this.loadingMovies = false;
                        console.error(error);
                    });
            },
            methods: {
                getMovie(id) {
                    this.loading = true;
                    this.error = "";

                    fetch(`http://localhost/movies-api/public/movies/${id}`)
                        .then(response => {
                            if (!response.ok) throw new Error("Movie not found.");
                            return response.json();
                        })
                        .then(data => {
                            this.title = data.title || "Not Available";
                            this.short_description = data.short_description || "Not Available";
                            this.poster = data.poster || "default.jpg";
                            this.director = data.director?.name || "Unknown Director";
                        })
                        .then(() => {
                            document.querySelector('#movie')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        })
                        .catch(error => {
                            this.error = "Error fetching movie details.";
                            console.error(error);
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            }
        });

        app.mount("#app");
    }

});
