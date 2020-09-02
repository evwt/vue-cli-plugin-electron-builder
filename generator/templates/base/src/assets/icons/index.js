import Vue from 'vue'
import EvIcon from 'evwt/plugins/EvIcon'

const context = require.context('.', true, /\.svg$/)
EvIcon.build(Vue, context)
