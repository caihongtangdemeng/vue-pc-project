import Mock from 'mockjs'
import banners from './Banners.json'
import floors from './Floors.json'

Mock.mock('/mock/banners',{code:200,data:banners})
Mock.mock('/mock/floors',{code:200,data:floors})

console.log('mock运行了')