<template>
    <v-card flat dark tile color="primary" class="main-lead relative overflow-hidden px-4 px-md-6 flex-fill fill-height">
        <v-container>
            <v-row align="center" justify="space-between">

                <v-col cols="12" sm="6" class="pl-md-6 py-6 py-md-16">
                    <div class="py-md-4">

                        <span class="font-weight-black">Welcome to</span>

                        <h1 class="font-weight-black text-h5 text-md-h3">NPM - Node Package Manager</h1>

                        <p class="mt-6 mb-0 font-weight-light text-body-2 lh-1-6">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur delectus facilis,
                            hic possimus quisquam velit. A distinctio ipsam nemo nobis odit optio porro, praesentium,
                            quae qui repellendus rerum vel voluptates.
                        </p>

                    </div>
                </v-col>

                <v-col cols="12" sm="6" order-md="1" class="d-flex align-center py-md-16">
                    <v-img :src="require('static/figure.png')" contain :aspect-ratio="2" class="relative z-index-2"/>
                </v-col>

            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: "MainLead"
}
</script>

<style lang="scss">
.main-lead {

    &::before {
        content: '';
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 70px solid #fff;
        opacity: .1;
        position: absolute;
        left: -200px;
        bottom: -200px;
    }

    &::after {
        content: '';
        width: 900px;
        height: 900px;
        border-radius: 50%;
        background-color: #000;
        opacity: .1;
        position: absolute;
        top: 30%;
        transform: translateY(-50%);
        right: -250px;
    }
}
</style>
