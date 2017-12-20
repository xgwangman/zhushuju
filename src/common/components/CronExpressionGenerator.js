import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import {Radio, Tabs, InputNumber} from 'antd';
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
require('../../../css/easyui.min.css');   

export default class CronExpressionGenerator extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let {setCronExpression} = this.props;
        $.parser.parse($("div.cronExpress"));
        var cpro_id = "u1331261";

        // function btnFan() {
        //     //获取参数中表达式的值
        //     var txt = $("#cron").val();
        //     if (txt) {
        //         var regs = txt.split(' ');
        //         $("input[name=v_second]").val(regs[0]);
        //         $("input[name=v_min]").val(regs[1]);
        //         $("input[name=v_hour]").val(regs[2]);
        //         $("input[name=v_day]").val(regs[3]);
        //         $("input[name=v_mouth]").val(regs[4]);
        //         $("input[name=v_week]").val(regs[5]);
        //
        //         initObj(regs[0], "second");
        //         initObj(regs[1], "min");
        //         initObj(regs[2], "hour");
        //         initDay(regs[3]);
        //         initMonth(regs[4]);
        //         initWeek(regs[5]);
        //
        //         if (regs.length > 6) {
        //             $("input[name=v_year]").val(regs[6]);
        //             initYear(regs[6]);
        //         }
        //     }
        // }
        //
        //
        // function initObj(strVal, strid) {
        //     var ary = null;
        //     var objRadio = $("input[name='" + strid + "'");
        //     if (strVal == "*") {
        //         objRadio.eq(0).attr("checked", "checked");
        //     } else if (strVal.split('-').length > 1) {
        //         ary = strVal.split('-');
        //         objRadio.eq(1).attr("checked", "checked");
        //         $("#" + strid + "Start_0").numberspinner('setValue', ary[0]);
        //         $("#" + strid + "End_0").numberspinner('setValue', ary[1]);
        //     } else if (strVal.split('/').length > 1) {
        //         ary = strVal.split('/');
        //         objRadio.eq(2).attr("checked", "checked");
        //         $("#" + strid + "Start_1").numberspinner('setValue', ary[0]);
        //         $("#" + strid + "End_1").numberspinner('setValue', ary[1]);
        //     } else {
        //         objRadio.eq(3).attr("checked", "checked");
        //         if (strVal != "?") {
        //             ary = strVal.split(",");
        //             for (var i = 0; i < ary.length; i++) {
        //                 $("." + strid + "List input[value='" + ary[i] + "']").attr("checked", "checked");
        //             }
        //         }
        //     }
        // }
        //
        // function initDay(strVal) {
        //     var ary = null;
        //     var objRadio = $("input[name='day'");
        //     if (strVal == "*") {
        //         objRadio.eq(0).attr("checked", "checked");
        //     } else if (strVal == "?") {
        //         objRadio.eq(1).attr("checked", "checked");
        //     } else if (strVal.split('-').length > 1) {
        //         ary = strVal.split('-');
        //         objRadio.eq(2).attr("checked", "checked");
        //         $("#dayStart_0").numberspinner('setValue', ary[0]);
        //         $("#dayEnd_0").numberspinner('setValue', ary[1]);
        //     } else if (strVal.split('/').length > 1) {
        //         ary = strVal.split('/');
        //         objRadio.eq(3).attr("checked", "checked");
        //         $("#dayStart_1").numberspinner('setValue', ary[0]);
        //         $("#dayEnd_1").numberspinner('setValue', ary[1]);
        //     } else if (strVal.split('W').length > 1) {
        //         ary = strVal.split('W');
        //         objRadio.eq(4).attr("checked", "checked");
        //         $("#dayStart_2").numberspinner('setValue', ary[0]);
        //     } else if (strVal == "L") {
        //         objRadio.eq(5).attr("checked", "checked");
        //     } else {
        //         objRadio.eq(6).attr("checked", "checked");
        //         ary = strVal.split(",");
        //         for (var i = 0; i < ary.length; i++) {
        //             $(".dayList input[value='" + ary[i] + "']").attr("checked", "checked");
        //         }
        //     }
        // }
        //
        // function initMonth(strVal) {
        //     var ary = null;
        //     var objRadio = $("input[name='mouth'");
        //     if (strVal == "*") {
        //         objRadio.eq(0).attr("checked", "checked");
        //     } else if (strVal == "?") {
        //         objRadio.eq(1).attr("checked", "checked");
        //     } else if (strVal.split('-').length > 1) {
        //         ary = strVal.split('-');
        //         objRadio.eq(2).attr("checked", "checked");
        //         $("#mouthStart_0").numberspinner('setValue', ary[0]);
        //         $("#mouthEnd_0").numberspinner('setValue', ary[1]);
        //     } else if (strVal.split('/').length > 1) {
        //         ary = strVal.split('/');
        //         objRadio.eq(3).attr("checked", "checked");
        //         $("#mouthStart_1").numberspinner('setValue', ary[0]);
        //         $("#mouthEnd_1").numberspinner('setValue', ary[1]);
        //
        //     } else {
        //         objRadio.eq(4).attr("checked", "checked");
        //
        //         ary = strVal.split(",");
        //         for (var i = 0; i < ary.length; i++) {
        //             $(".mouthList input[value='" + ary[i] + "']").attr("checked", "checked");
        //         }
        //     }
        // }
        //
        // function initWeek(strVal) {
        //     var ary = null;
        //     var objRadio = $("input[name='week'");
        //     if (strVal == "*") {
        //         objRadio.eq(0).attr("checked", "checked");
        //     } else if (strVal == "?") {
        //         objRadio.eq(1).attr("checked", "checked");
        //     } else if (strVal.split('/').length > 1) {
        //         ary = strVal.split('/');
        //         objRadio.eq(2).attr("checked", "checked");
        //         $("#weekStart_0").numberspinner('setValue', ary[0]);
        //         $("#weekEnd_0").numberspinner('setValue', ary[1]);
        //     } else if (strVal.split('-').length > 1) {
        //         ary = strVal.split('-');
        //         objRadio.eq(3).attr("checked", "checked");
        //         $("#weekStart_1").numberspinner('setValue', ary[0]);
        //         $("#weekEnd_1").numberspinner('setValue', ary[1]);
        //     } else if (strVal.split('L').length > 1) {
        //         ary = strVal.split('L');
        //         objRadio.eq(4).attr("checked", "checked");
        //         $("#weekStart_2").numberspinner('setValue', ary[0]);
        //     } else {
        //         objRadio.eq(5).attr("checked", "checked");
        //         ary = strVal.split(",");
        //         for (var i = 0; i < ary.length; i++) {
        //             $(".weekList input[value='" + ary[i] + "']").attr("checked", "checked");
        //         }
        //     }
        // }
        //
        // function initYear(strVal) {
        //     var ary = null;
        //     var objRadio = $("input[name='year'");
        //     if (strVal == "*") {
        //         objRadio.eq(1).attr("checked", "checked");
        //     } else if (strVal.split('-').length > 1) {
        //         ary = strVal.split('-');
        //         objRadio.eq(2).attr("checked", "checked");
        //         $("#yearStart_0").numberspinner('setValue', ary[0]);
        //         $("#yearEnd_0").numberspinner('setValue', ary[1]);
        //     }
        // }

        $(function () {
            $(".numberspinner").numberspinner({
                onChange: function () {
                    $(this).closest("div.line").children().eq(0).click();
                }
            });

            var vals = $("input[name^='v_']");
            var cron = $("#cron");
            vals.change(function() {
                var item = [];
                vals.each(function () {
                    item.push(this.value);
                });
                //修复表达式错误BUG，如果后一项不为* 那么前一项肯定不为为*，要不然就成了每秒执行了
                //获取当前选中tab
                var currentIndex = 0;
                $(".tabs>li").each(function (i, item) {
                    if ($(item).hasClass("tabs-selected")) {
                        currentIndex = i;
                        return false;
                    }

                });
                //当前选中项之前的如果为*，则都设置成0
                for (var i = currentIndex; i >= 1; i--) {
                    if (item[i] != "*" && item[i - 1] == "*") {
                        item[i - 1] = "0";
                    }
                }
                //当前选中项之后的如果不为*则都设置成*
                if (item[currentIndex] == "*") {
                    for (var i = currentIndex + 1; i < item.length; i++) {
                        if (i == 5) {
                            item[i] = "?";
                        } else {
                            item[i] = "*";
                        }
                    }
                }
                var cronExpression = item.join(" ");
                //setFieldsValue({expression:cronExpression});
                 var reactCronExpression = $("#expression");
                reactCronExpression.val(cronExpression).change();//给form表单中的表达式赋值
                if(cronExpression==''){
                    $('#expressionDiv').addClass('has-error');
                    $('#expressionDiv').removeClass('has-success');
                    $('#expressionError').show();
                }else{
                    /*(function renderDescription(cronExpression) {
                        let cron=cronExpression.split(' ');
                        for(let i=0;i<cron.length;i++){
                            if(i=0){
                                if(cron[i].indexOf('-')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_second').text('的第'+s+'秒到第'+e+'秒')
                                }else if(cron[i].indexOf('/')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_second').text('的第'+s+'秒开始没隔'+e+'秒')
                                }else if(cron[i].indexOf(',')>-1 || !isNaN(cron[i])){
                                    $('#cron_second').text('的第'+cron[i]+'秒')
                                }else if(cron[i]=='*'){
                                    $('#cron_second').text('每秒')
                                }
                            }else if (i=1){
                                if(cron[i].indexOf('-')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_minute').text('的第'+s+'秒到第'+e+'分')
                                }else if(cron[i].indexOf('/')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_minute').text('的第'+s+'秒开始没隔'+e+'分')
                                }else if(cron[i].indexOf(',')>-1 || !isNaN(cron[i])){
                                    $('#cron_minute').text('的第'+cron[i]+'分')
                                }else if(cron[i]=='*'){
                                    $('#cron_minute').text('每分')
                                }
                            }else if (i=2){
                                if(cron[i].indexOf('-')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_hour').text('的第'+s+'点到第'+e+'点')
                                }else if(cron[i].indexOf('/')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_hour').text('的第'+s+'点开始没隔'+e+'点')
                                }else if(cron[i].indexOf(',')>-1 || !isNaN(cron[i])){
                                    $('#cron_hour').text('的第'+cron[i]+'点')
                                }else if(cron[i]=='*'){
                                    $('#cron_hour').text('每点')
                                }
                            }else if (i=3){
                                if(cron[i].indexOf('-')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_day').text('的第'+s+'日到第'+e+'日')
                                }else if(cron[i].indexOf('/')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_day').text('的第'+s+'日开始没隔'+e+'日')
                                }else if(cron[i].indexOf(',')>-1 || !isNaN(cron[i])){
                                    $('#cron_day').text('的第'+cron[i]+'日')
                                }else if(cron[i].indexOf('W')>-1){
                                    let day=cron[i].replace();
                                    $('#cron_day').text('的每月'+day+'日最近的工作日')
                                }else if(cron[i].indexOf('L')>-1){
                                    let day=cron[i].replace();
                                    $('#cron_day').text('本月最后的一天')
                                }else if(cron[i]=='*'){
                                    $('#cron_day').text('每日')
                                }else if(cron[i]=='?'){
                                    $('#cron_day').text('某日')
                                }
                            }else if (i=4){
                                if(cron[i].indexOf('-')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_month').text('的第'+s+'月到第'+e+'月')
                                }else if(cron[i].indexOf('/')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_month').text('的第'+s+'月开始没隔'+e+'月')
                                }else if(cron[i].indexOf(',')>-1 || !isNaN(cron[i])){
                                    $('#cron_month').text('的第'+cron[i]+'月')
                                }else if(cron[i]=='*'){
                                    $('#cron_month').text('每月')
                                }else if(cron[i]=='?'){
                                    $('#cron_month').text('某月')
                                }
                            }else if (i=5){
                                if(cron[i].indexOf('-')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_week').text('的第'+s+'周到第'+e+'周')
                                }else if(cron[i].indexOf('/')>-1){
                                    let s=cron[i].substr(0,1);
                                    let e=cron[i].substr(-1,1);
                                    $('#cron_week').text('的第'+s+'周开始没隔'+e+'周')
                                }else if(cron[i].indexOf(',')>-1 || !isNaN(cron[i])){
                                    $('#cron_week').text('的第'+cron[i]+'周')
                                }else if(cron[i]=='*'){
                                    $('#cron_week').text('每周')
                                }else if(cron[i]=='?'){
                                    $('#cron_week').text('某周')
                                }
                            }
                        }
                    })(cronExpression);*/
                    $('#expressionDiv').removeClass('has-error');
                    $('#expressionDiv').addClass('has-success');
                    $('#expressionError').hide();
                }
                cron.val(cronExpression).change();
            });

            // cron.change(function () {
            //     btnFan();
            //设置最近五次运行时间
            // $.ajax({
            //     type: 'get',
            //     url: "CalcRunTime.ashx",
            //     dataType: "json",
            //     data: {"CronExpression": $("#cron").val()},
            //     success: function (data) {
            //         if (data && data.length == 5) {
            //             var strHTML = "<ul>";
            //             for (var i = 0; i < data.length; i++) {
            //                 strHTML += "<li>" + data[i] + "</li>";
            //             }
            //             strHTML += "</ul>"
            //             $("#runTime").html(strHTML);
            //         } else {
            //             $("#runTime").html("");
            //         }
            //     }
            // });
            // });

            var secondList = $(".secondList").children();
            $("#sencond_appoint").click(function () {
                if (this.checked) {
                    if ($(secondList).filter(":checked").length == 0) {
                        $(secondList.eq(0)).attr("checked", true);
                    }
                    secondList.eq(0).change();
                }
            });

            secondList.change(function () {
                var sencond_appoint = $("#sencond_appoint").prop("checked");
                if (sencond_appoint) {
                    var vals = [];
                    secondList.each(function () {
                        if (this.checked) {
                            vals.push(this.value);
                        }
                    });
                    var val = "?";
                    if (vals.length > 0 && vals.length < 59) {
                        val = vals.join(",");
                    } else if (vals.length == 59) {
                        val = "*";
                    }
                    var item = $("input[name=v_second]");
                    item.val(val);
                    item.change();
                }
            });

            var minList = $(".minList").children();
            $("#min_appoint").click(function () {
                if (this.checked) {
                    if ($(minList).filter(":checked").length == 0) {
                        $(minList.eq(0)).attr("checked", true);
                    }
                    minList.eq(0).change();
                }
            });

            minList.change(function () {
                var min_appoint = $("#min_appoint").prop("checked");
                if (min_appoint) {
                    var vals = [];
                    minList.each(function () {
                        if (this.checked) {
                            vals.push(this.value);
                        }
                    });
                    var val = "?";
                    if (vals.length > 0 && vals.length < 59) {
                        val = vals.join(",");
                    } else if (vals.length == 59) {
                        val = "*";
                    }
                    var item = $("input[name=v_min]");
                    item.val(val);
                    item.change();
                }
            });

            var hourList = $(".hourList").children();
            $("#hour_appoint").click(function () {
                if (this.checked) {
                    if ($(hourList).filter(":checked").length == 0) {
                        $(hourList.eq(0)).attr("checked", true);
                    }
                    hourList.eq(0).change();
                }
            });

            hourList.change(function () {
                var hour_appoint = $("#hour_appoint").prop("checked");
                if (hour_appoint) {
                    var vals = [];
                    hourList.each(function () {
                        if (this.checked) {
                            vals.push(this.value);
                        }
                    });
                    var val = "?";
                    if (vals.length > 0 && vals.length < 24) {
                        val = vals.join(",");
                    } else if (vals.length == 24) {
                        val = "*";
                    }
                    var item = $("input[name=v_hour]");
                    item.val(val);
                    item.change();
                }
            });

            var dayList = $(".dayList").children();
            $("#day_appoint").click(function () {
                if (this.checked) {
                    if ($(dayList).filter(":checked").length == 0) {
                        $(dayList.eq(0)).attr("checked", true);
                    }
                    dayList.eq(0).change();
                }
            });

            dayList.change(function () {
                var day_appoint = $("#day_appoint").prop("checked");
                if (day_appoint) {
                    var vals = [];
                    dayList.each(function () {
                        if (this.checked) {
                            vals.push(this.value);
                        }
                    });
                    var val = "?";
                    if (vals.length > 0 && vals.length < 31) {
                        val = vals.join(",");
                    } else if (vals.length == 31) {
                        val = "*";
                    }
                    var item = $("input[name=v_day]");
                    item.val(val);
                    item.change();
                }
            });

            var mouthList = $(".mouthList").children();
            $("#mouth_appoint").click(function () {
                if (this.checked) {
                    if ($(mouthList).filter(":checked").length == 0) {
                        $(mouthList.eq(0)).attr("checked", true);
                    }
                    mouthList.eq(0).change();
                }
            });

            mouthList.change(function () {
                var mouth_appoint = $("#mouth_appoint").prop("checked");
                if (mouth_appoint) {
                    var vals = [];
                    mouthList.each(function () {
                        if (this.checked) {
                            vals.push(this.value);
                        }
                    });
                    var val = "?";
                    if (vals.length > 0 && vals.length < 12) {
                        val = vals.join(",");
                    } else if (vals.length == 12) {
                        val = "*";
                    }
                    var item = $("input[name=v_mouth]");
                    item.val(val);
                    item.change();
                }
            });

            var weekList = $(".weekList").children();
            $("#week_appoint").click(function () {
                if (this.checked) {
                    if ($(weekList).filter(":checked").length == 0) {
                        $(weekList.eq(0)).attr("checked", true);
                    }
                    weekList.eq(0).change();
                }
            });

            weekList.change(function () {
                var week_appoint = $("#week_appoint").prop("checked");
                if (week_appoint) {
                    var vals = [];
                    weekList.each(function () {
                        if (this.checked) {
                            vals.push(this.value);
                        }
                    });
                    var val = "?";
                    if (vals.length > 0 && vals.length < 7) {
                        val = vals.join(",");
                    } else if (vals.length == 7) {
                        val = "*";
                    }
                    var item = $("input[name=v_week]");
                    item.val(val);
                    item.change();
                }
            });
        });
    }
    renderDescription=()=>{

    };
    render() {
        return (
            <div className="cronExpress">
                <div className="easyui-layout"
                     style={{
                         width: '470px',
                         height: '560px',
                         border: '1px rgb(202, 196, 196) solid',
                         borderRadius: '5px'
                     }}>
                    <div style={{height: '100%'}}>
                        <div className="easyui-tabs">
                            <div title="秒">
                                <div className="line">
                                    <input type="radio"  name="second"
                                           onClick={this.everyTime}/>
                                    每秒 允许的通配符[, - * /]
                                </div>
                                <div className="line">
                                    <input type="radio" name="second" onClick={this.cycle}/>
                                    周期从
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:1,max:58"
                                           value="1"
                                           id="secondStart_0"/>
                                    -
                                    <input className="numberspinner" style={{width: '60px'}}
                                           data-options="min:2,max:59"
                                           value="2"
                                           id="secondEnd_0"/>
                                    秒
                                </div>
                                <div className="line">
                                    <input type="radio" name="second" onClick={this.startOn}/>
                                    从
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:0,max:59"
                                           value="0"
                                           id="secondStart_1"/>
                                    秒开始,每
                                    <input className="numberspinner" style={{width: '60px'}}
                                           data-options="min:1,max:59"
                                           value="1"
                                           id="secondEnd_1"/>
                                    秒执行一次
                                </div>
                                <div className="line">
                                    <input type="radio" name="second" id="sencond_appoint"/>
                                    指定
                                </div>
                                <div className="imp secondList">
                                    <input type="checkbox" value="0"/>00
                                    <input type="checkbox" value="1"/>01
                                    <input type="checkbox" value="2"/>02
                                    <input type="checkbox" value="3"/>03
                                    <input type="checkbox" value="4"/>04
                                    <input type="checkbox" value="5"/>05
                                    <input type="checkbox" value="6"/>06
                                    <input type="checkbox" value="7"/>07
                                    <input type="checkbox" value="8"/>08
                                    <input type="checkbox" value="9"/>09
                                </div>
                                <div className="imp secondList">
                                    <input type="checkbox" value="10"/>10
                                    <input type="checkbox" value="11"/>11
                                    <input type="checkbox" value="12"/>12
                                    <input type="checkbox" value="13"/>13
                                    <input type="checkbox" value="14"/>14
                                    <input type="checkbox" value="15"/>15
                                    <input type="checkbox" value="16"/>16
                                    <input type="checkbox" value="17"/>17
                                    <input type="checkbox" value="18"/>18
                                    <input type="checkbox" value="19"/>19
                                </div>
                                <div className="imp secondList">
                                    <input type="checkbox" value="20"/>20
                                    <input type="checkbox" value="21"/>21
                                    <input type="checkbox" value="22"/>22
                                    <input type="checkbox" value="23"/>23
                                    <input type="checkbox" value="24"/>24
                                    <input type="checkbox" value="25"/>25
                                    <input type="checkbox" value="26"/>26
                                    <input type="checkbox" value="27"/>27
                                    <input type="checkbox" value="28"/>28
                                    <input type="checkbox" value="29"/>29
                                </div>
                                <div className="imp secondList">
                                    <input type="checkbox" value="30"/>30
                                    <input type="checkbox" value="31"/>31
                                    <input type="checkbox" value="32"/>32
                                    <input type="checkbox" value="33"/>33
                                    <input type="checkbox" value="34"/>34
                                    <input type="checkbox" value="35"/>35
                                    <input type="checkbox" value="36"/>36
                                    <input type="checkbox" value="37"/>37
                                    <input type="checkbox" value="38"/>38
                                    <input type="checkbox" value="39"/>39
                                </div>
                                <div className="imp secondList">
                                    <input type="checkbox" value="40"/>40
                                    <input type="checkbox" value="41"/>41
                                    <input type="checkbox" value="42"/>42
                                    <input type="checkbox" value="43"/>43
                                    <input type="checkbox" value="44"/>44
                                    <input type="checkbox" value="45"/>45
                                    <input type="checkbox" value="46"/>46
                                    <input type="checkbox" value="47"/>47
                                    <input type="checkbox" value="48"/>48
                                    <input type="checkbox" value="49"/>49
                                </div>
                                <div className="imp secondList">
                                    <input type="checkbox" value="50"/>50
                                    <input type="checkbox" value="51"/>51
                                    <input type="checkbox" value="52"/>52
                                    <input type="checkbox" value="53"/>53
                                    <input type="checkbox" value="54"/>54
                                    <input type="checkbox" value="55"/>55
                                    <input type="checkbox" value="56"/>56
                                    <input type="checkbox" value="57"/>57
                                    <input type="checkbox" value="58"/>58
                                    <input type="checkbox" value="59"/>59
                                </div>
                            </div>
                            <div title="分钟">
                                <div className="line">
                                    <input type="radio"  name="min" onClick={this.everyTime}/>
                                    分钟 允许的通配符[, - * /]
                                </div>
                                <div className="line">
                                    <input type="radio" name="min" onClick={this.cycle}/>
                                    周期从
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:1,max:58"
                                           value="1"
                                           id="minStart_0"/>
                                    -
                                    <input className="numberspinner" style={{width: '60px'}}
                                           data-options="min:2,max:59"
                                           value="2"
                                           id="minEnd_0"/>
                                    分钟
                                </div>
                                <div className="line">
                                    <input type="radio" name="min" onClick={this.startOn}/>
                                    从
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:0,max:59"
                                           value="0"
                                           id="minStart_1"/>
                                    分钟开始,每
                                    <input className="numberspinner" style={{width: '60px'}}
                                           data-options="min:1,max:59"
                                           value="1"
                                           id="minEnd_1"/>
                                    分钟执行一次
                                </div>
                                <div className="line">
                                    <input type="radio" name="min" id="min_appoint"/>
                                    指定
                                </div>
                                <div className="imp minList">
                                    <input type="checkbox" value="0"/>00
                                    <input type="checkbox" value="1"/>01
                                    <input type="checkbox" value="2"/>02
                                    <input type="checkbox" value="3"/>03
                                    <input type="checkbox" value="4"/>04
                                    <input type="checkbox" value="5"/>05
                                    <input type="checkbox" value="6"/>06
                                    <input type="checkbox" value="7"/>07
                                    <input type="checkbox" value="8"/>08
                                    <input type="checkbox" value="9"/>09
                                </div>
                                <div className="imp minList">
                                    <input type="checkbox" value="10"/>10
                                    <input type="checkbox" value="11"/>11
                                    <input type="checkbox" value="12"/>12
                                    <input type="checkbox" value="13"/>13
                                    <input type="checkbox" value="14"/>14
                                    <input type="checkbox" value="15"/>15
                                    <input type="checkbox" value="16"/>16
                                    <input type="checkbox" value="17"/>17
                                    <input type="checkbox" value="18"/>18
                                    <input type="checkbox" value="19"/>19
                                </div>
                                <div className="imp minList">
                                    <input type="checkbox" value="20"/>20
                                    <input type="checkbox" value="21"/>21
                                    <input type="checkbox" value="22"/>22
                                    <input type="checkbox" value="23"/>23
                                    <input type="checkbox" value="24"/>24
                                    <input type="checkbox" value="25"/>25
                                    <input type="checkbox" value="26"/>26
                                    <input type="checkbox" value="27"/>27
                                    <input type="checkbox" value="28"/>28
                                    <input type="checkbox" value="29"/>29
                                </div>
                                <div className="imp minList">
                                    <input type="checkbox" value="30"/>30
                                    <input type="checkbox" value="31"/>31
                                    <input type="checkbox" value="32"/>32
                                    <input type="checkbox" value="33"/>33
                                    <input type="checkbox" value="34"/>34
                                    <input type="checkbox" value="35"/>35
                                    <input type="checkbox" value="36"/>36
                                    <input type="checkbox" value="37"/>37
                                    <input type="checkbox" value="38"/>38
                                    <input type="checkbox" value="39"/>39
                                </div>
                                <div className="imp minList">
                                    <input type="checkbox" value="40"/>40
                                    <input type="checkbox" value="41"/>41
                                    <input type="checkbox" value="42"/>42
                                    <input type="checkbox" value="43"/>43
                                    <input type="checkbox" value="44"/>44
                                    <input type="checkbox" value="45"/>45
                                    <input type="checkbox" value="46"/>46
                                    <input type="checkbox" value="47"/>47
                                    <input type="checkbox" value="48"/>48
                                    <input type="checkbox" value="49"/>49
                                </div>
                                <div className="imp minList">
                                    <input type="checkbox" value="50"/>50
                                    <input type="checkbox" value="51"/>51
                                    <input type="checkbox" value="52"/>52
                                    <input type="checkbox" value="53"/>53
                                    <input type="checkbox" value="54"/>54
                                    <input type="checkbox" value="55"/>55
                                    <input type="checkbox" value="56"/>56
                                    <input type="checkbox" value="57"/>57
                                    <input type="checkbox" value="58"/>58
                                    <input type="checkbox" value="59"/>59
                                </div>
                            </div>
                            <div title="小时">
                                <div className="line">
                                    <input type="radio"  name="hour" onClick={this.everyTime}/>
                                    小时 允许的通配符[, - * /]
                                </div>
                                <div className="line">
                                    <input type="radio" name="hour" onClick={this.cycle}/>
                                    周期从
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:0,max:23"
                                           value="0"
                                           id="hourStart_0"/>
                                    -
                                    <input className="numberspinner" style={{width: '60px'}}
                                           data-options="min:2,max:23"
                                           value="2"
                                           id="hourEnd_1"/>
                                    小时
                                </div>
                                <div className="line">
                                    <input type="radio" name="hour" onClick={this.startOn}/>
                                    从
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:0,max:23"
                                           value="0"
                                           id="hourStart_1"/>
                                    小时开始,每
                                    <input className="numberspinner" style={{width: '60px'}}
                                           data-options="min:1,max:23"
                                           value="1"
                                           id="hourEnd_1"/>
                                    小时执行一次
                                </div>
                                <div className="line">
                                    <input type="radio" name="hour" id="hour_appoint"/>
                                    指定
                                </div>
                                <div className="imp hourList">
                                    AM:
                                    <input type="checkbox" value="0"/>00
                                    <input type="checkbox" value="1"/>01
                                    <input type="checkbox" value="2"/>02
                                    <input type="checkbox" value="3"/>03
                                    <input type="checkbox" value="4"/>04
                                    <input type="checkbox" value="5"/>05
                                    <input type="checkbox" value="6"/>06
                                    <input type="checkbox" value="7"/>07
                                    <input type="checkbox" value="8"/>08
                                    <input type="checkbox" value="9"/>09
                                    <input type="checkbox" value="10"/>10
                                    <input type="checkbox" value="11"/>11
                                </div>
                                <div className="imp hourList">
                                    PM:
                                    <input type="checkbox" value="12"/>12
                                    <input type="checkbox" value="13"/>13
                                    <input type="checkbox" value="14"/>14
                                    <input type="checkbox" value="15"/>15
                                    <input type="checkbox" value="16"/>16
                                    <input type="checkbox" value="17"/>17
                                    <input type="checkbox" value="18"/>18
                                    <input type="checkbox" value="19"/>19
                                    <input type="checkbox" value="20"/>20
                                    <input type="checkbox" value="21"/>21
                                    <input type="checkbox" value="22"/>22
                                    <input type="checkbox" value="23"/>23
                                </div>
                            </div>
                            <div title="日">
                                <div className="line">
                                    <input type="radio"  name="day" onClick={this.everyTime}/>
                                    日 允许的通配符[, - * / L W]
                                </div>
                                <div className="line">
                                    <input type="radio" name="day" onClick={this.unAppoint}/>
                                    不指定
                                </div>
                                <div className="line">
                                    <input type="radio" name="day" onClick={this.cycle}/>
                                    周期从
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:1,max:31"
                                           value="1"
                                           id="dayStart_0"/>
                                    -
                                    <input className="numberspinner" style={{width: '60px'}}
                                           data-options="min:2,max:31"
                                           value="2"
                                           id="dayEnd_0"/>
                                    日
                                </div>
                                <div className="line">
                                    <input type="radio" name="day" onClick={this.startOn}/>
                                    从
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:1,max:31"
                                           value="1"
                                           id="dayStart_1"/>
                                    日开始,每
                                    <input className="numberspinner" style={{width: '60px'}}
                                           data-options="min:1,max:31"
                                           value="1"
                                           id="dayEnd_1"/>
                                    天执行一次
                                </div>
                                <div className="line">
                                    <input type="radio" name="day" onClick={this.workDay}/>
                                    每月
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:1,max:31"
                                           value="1"
                                           id="dayStart_2"/>
                                    号最近的那个工作日
                                </div>
                                <div className="line">
                                    <input type="radio" name="day" onClick={this.lastDay}/>
                                    本月最后一天
                                </div>
                                <div className="line">
                                    <input type="radio" name="day" id="day_appoint"/>
                                    指定
                                </div>
                                <div className="imp dayList">
                                    <input type="checkbox" value="1"/>1
                                    <input type="checkbox" value="2"/>2
                                    <input type="checkbox" value="3"/>3
                                    <input type="checkbox" value="4"/>4
                                    <input type="checkbox" value="5"/>5
                                    <input type="checkbox" value="6"/>6
                                    <input type="checkbox" value="7"/>7
                                    <input type="checkbox" value="8"/>8
                                    <input type="checkbox" value="9"/>9
                                    <input type="checkbox" value="10"/>10
                                    <input type="checkbox" value="11"/>11
                                    <input type="checkbox" value="12"/>12
                                    <input type="checkbox" value="13"/>13
                                    <input type="checkbox" value="14"/>14
                                    <input type="checkbox"
                                           value="15"/>15
                                    <input type="checkbox"
                                           value="16"/>16
                                </div>
                                <div className="imp dayList">
                                    <input type="checkbox" value="17"/>17
                                    <input type="checkbox" value="18"/>18
                                    <input type="checkbox" value="19"/>19
                                    <input type="checkbox" value="20"/>20
                                    <input type="checkbox" value="21"/>21
                                    <input type="checkbox" value="22"/>22
                                    <input type="checkbox" value="23"/>23
                                    <input type="checkbox" value="24"/>24
                                    <input type="checkbox" value="25"/>25
                                    <input type="checkbox" value="26"/>26
                                    <input type="checkbox" value="27"/>27
                                    <input type="checkbox" value="28"/>28
                                    <input type="checkbox" value="29"/>29
                                    <input type="checkbox" value="30"/>30
                                    <input type="checkbox"
                                           value="31"/>31
                                </div>
                            </div>
                            <div title="月">
                                <div className="line">
                                    <input type="radio"  name="mouth" onClick={this.everyTime}/>
                                    月 允许的通配符[, - * /]
                                </div>
                                <div className="line">
                                    <input type="radio" name="mouth" onClick={this.unAppoint}/>
                                    不指定
                                </div>
                                <div className="line">
                                    <input type="radio" name="mouth" onClick={this.cycle}/>
                                    周期从
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:1,max:12"
                                           value="1"
                                           id="mouthStart_0"/>
                                    -
                                    <input className="numberspinner" style={{width: '60px'}}
                                           data-options="min:2,max:12"
                                           value="2"
                                           id="mouthEnd_0"/>
                                    月
                                </div>
                                <div className="line">
                                    <input type="radio" name="mouth" onClick={this.startOn}/>
                                    从
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:1,max:12"
                                           value="1"
                                           id="mouthStart_1"/>
                                    日开始,每
                                    <input className="numberspinner" style={{width: '60px'}}
                                           data-options="min:1,max:12"
                                           value="1"
                                           id="mouthEnd_1"/>
                                    月执行一次
                                </div>
                                <div className="line">
                                    <input type="radio" name="mouth" id="mouth_appoint"/>
                                    指定
                                </div>
                                <div className="imp mouthList">
                                    <input type="checkbox" value="1"/>1
                                    <input type="checkbox" value="2"/>2
                                    <input type="checkbox" value="3"/>3
                                    <input type="checkbox" value="4"/>4
                                    <input type="checkbox" value="5"/>5
                                    <input type="checkbox" value="6"/>6
                                    <input type="checkbox" value="7"/>7
                                    <input type="checkbox" value="8"/>8
                                    <input type="checkbox" value="9"/>9
                                    <input type="checkbox" value="10"/>10
                                    <input type="checkbox" value="11"/>11
                                    <input type="checkbox" value="12"/>12
                                </div>
                            </div>
                            <div title="周">
                                <div className="line">
                                    <input type="radio"  name="week" onClick={this.everyTime}/>
                                    周 允许的通配符[, - * / L #]
                                </div>
                                <div className="line">
                                    <input type="radio" name="week" onClick={this.unAppoint}/>
                                    不指定
                                </div>
                                <div className="line">
                                    <input type="radio" name="week" onClick={this.startOn}/>
                                    周期 从星期<input className="numberspinner" style={{width: '60px'}}
                                                 data-options="min:1,max:7"
                                                 id="weekStart_0" value="1"/>
                                    -
                                    <input className="numberspinner" style={{width: '60px'}} data-options="min:2,max:7"
                                           value="2"
                                           id="weekEnd_0"/></div>
                                <div className="line">
                                    <input type="radio" name="week" onClick={this.weekOfDay}/>
                                    第<input className="numberspinner" style={{width: '60px'}} data-options="min:1,max:4"
                                            value="1"
                                            id="weekStart_1"/>
                                    周的星期<input className="numberspinner" style={{width: '60px'}}
                                               data-options="min:1,max:7"
                                               id="weekEnd_1" value="1"/>
                                </div>
                                <div className="line">
                                    <input type="radio" name="week" onClick={this.lastWeek}/>
                                    本月最后一个星期
                                    <input className="numberspinner" style={{width: '60px'}}
                                           data-options="min:1,max:7"
                                           id="weekStart_2" value="1"/>
                                </div>
                                <div className="line">
                                    <input type="radio" name="week" id="week_appoint"/>
                                    指定
                                </div>
                                <div className="imp weekList">
                                    <input type="checkbox" value="1"/>1
                                    <input type="checkbox" value="2"/>2
                                    <input type="checkbox" value="3"/>3
                                    <input type="checkbox" value="4"/>4
                                    <input type="checkbox" value="5"/>5
                                    <input type="checkbox" value="6"/>6
                                    <input type="checkbox" value="7"/>7
                                </div>
                            </div>
                            <div title="年">
                                <div className="line">
                                    <input type="radio"  name="year" onClick={this.unAppoint}/>
                                    不指定 允许的通配符[, - * /] 非必填
                                </div>
                                <div className="line">
                                    <input type="radio" name="year" onClick={this.everyTime}/>
                                    每年
                                </div>
                                <div className="line">
                                    <input type="radio" name="year" onClick={this.cycle}/>周期 从
                                    <input className="numberspinner" style={{width: '90px'}}
                                           data-options="min:2013,max:3000"
                                           id="yearStart_0" value="2013"/>
                                    -
                                    <input className="numberspinner" style={{width: '90px'}}
                                           data-options="min:2014,max:3000"
                                           id="yearEnd_0" value="2014"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-options="region:'south',border:false" style={{height: '220px'}}>
                        <fieldset style={{borderRadius: '3px', height: '220px'}}>
                            <legend>表达式</legend>
                            <table style={{height: '100px'}}>
                                <tbody>
                                <tr>
                                    <td>
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        秒
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        分钟
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        小时
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        日
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        月<br />
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        星期
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        年
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        表达式字段:
                                    </td>
                                    <td>
                                        <input type="text" name="v_second" className="col" value="*" readOnly="readonly"
                                               style={{width: '50px'}}/>
                                    </td>
                                    <td>
                                        <input type="text" name="v_min" className="col" value="*" readOnly="readonly"
                                               style={{width: '50px'}}/>
                                    </td>
                                    <td>
                                        <input type="text" name="v_hour" className="col" value="*" readOnly="readonly"
                                               style={{width: '50px'}}/>
                                    </td>
                                    <td>
                                        <input type="text" name="v_day" className="col" value="*" readOnly="readonly"
                                               style={{width: '50px'}}/>
                                    </td>
                                    <td>
                                        <input type="text" name="v_mouth" className="col" value="*" readOnly="readonly"
                                               style={{width: '50px'}}/>
                                    </td>
                                    <td>
                                        <input type="text" name="v_week" className="col" value="?" readOnly="readonly"
                                               style={{width: '50px'}}/>
                                    </td>
                                    <td>
                                        <input type="text" name="v_year" className="col" readOnly="readonly"
                                               style={{width: '50px'}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Cron 表达式:</td>
                                    <td colSpan="6"><input type="text" name="cron" style={{width: '100%'}}
                                                           value="* * * * * ?"
                                                           id="cron"
                                    /></td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </fieldset>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * 每周期
     */
    everyTime(dom) {
        var item = $("input[name=v_" + dom.target.name + "]");
        item.val("*");
        item.change();
    }

    /**
     * 不指定
     */
    unAppoint(dom) {
        var name = dom.target.name;
        var val = "?";
        if (name == "year")
            val = "";
        var item = $("input[name=v_" + name + "]");
        item.val(val);
        item.change();
    }

    appoint(dom) {

    }

    /**
     * 周期
     */
    cycle(dom) {
        var name = dom.target.name;
        var ns = $(dom.target).parent().find(".numberspinner");
        var start = ns.eq(0).numberspinner("getValue");
        var end = ns.eq(1).numberspinner("getValue");
        var item = $("input[name=v_" + name + "]");
        item.val(start + "-" + end);
        item.change();
    }

    /**
     * 从开始
     */
    startOn(dom) {
        var name = dom.target.name;
        var ns = $(dom.target).parent().find(".numberspinner");
        var start = ns.eq(0).numberspinner("getValue");
        var end = ns.eq(1).numberspinner("getValue");
        var item = $("input[name=v_" + name + "]");
        item.val(start + "/" + end);
        item.change();
    }

    lastDay(dom) {
        var item = $("input[name=v_" + dom.target.name + "]");
        item.val("L");
        item.change();
    }

    weekOfDay(dom) {
        var name = dom.name;
        var ns = $(dom).parent().find(".numberspinner");
        var start = ns.eq(0).numberspinner("getValue");
        var end = ns.eq(1).numberspinner("getValue");
        var item = $("input[name=v_" + name + "]");
        item.val(start + "#" + end);
        item.change();
    }

    lastWeek(dom) {
        var item = $("input[name=v_" + dom.name + "]");
        var ns = $(dom).parent().find(".numberspinner");
        var start = ns.eq(0).numberspinner("getValue");
        item.val(start + "L");
        item.change();
    }

    workDay(dom) {
        var name = dom.name;
        var ns = $(dom).parent().find(".numberspinner");
        var start = ns.eq(0).numberspinner("getValue");
        var item = $("input[name=v_" + name + "]");
        item.val(start + "W");
        item.change();
    }

}