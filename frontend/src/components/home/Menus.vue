<!--Página do layout dos Menus  -->
<template>
    <div class="menus">
        <div class="menus-icon">
            <i :class="icon"></i>
        </div>
        <span class="menus-title">{{title}}</span>
    </div>
</template>

<script>
export default {
    name: 'Menus',
    props: ['icon', 'title'],
}
</script>

<style>
    .menus{
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 8px;
        margin-right: 20px;
        margin-bottom: 20px;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        text-decoration: none;
        color: #000;
    }

    .menus-icon{
        display: flex;
        color: red;
        align-items: center;
        text-decoration: none;

    }
    .menus-icon i{
        font-size: 4rem;
        text-decoration: none;
    }

    .menus-titte{
        font-size: 0.9rem;
        text-decoration: none;
    }
</style>