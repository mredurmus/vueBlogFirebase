<template>
  <div class="home">
    <BlogPost :post="welcomeScreen"/>
    <BlogPost :post="post" v-for="(post,index) in sampleBlogPost" :key="index"/>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue"
export default {
  name: "Home",
  components: {BlogPost},
  data () {
    return {
      welcomeScreen: {
        title: "Welcome",
        blogPost: "For You 💖",
        welcomeScreen: true,
        photo: "lol",
      },
      sampleBlogPost: [
        {
          title: "This is a Filler Title!",
          blogHTML: "This is a filler blog post title",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "This is a Filler Title2!",
          blogHTML: "This is a filler blog post title",
          blogCoverPhoto: "designed-for-everyone",
        },
        {
          title: "This is a Filler Title3!",
          blogHTML: "This is a filler blog post title",
          blogCoverPhoto: "coding",
        },
      ],
    };
  },
};
</script>
