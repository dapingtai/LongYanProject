/** 確認訂單 Email模板**/

function emailMasterTemplate (newOrder){
    return (
    `
<div>
    <table style="border:1px solid #dcdcdc" width="764" cellspacing="0" cellpadding="18" border="0">
        <tbody>
        <tr>
            <td bgcolor="#FFFFFF">
                    <p style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px;margin:0;padding:0;line-height:26px"> 
                        [訂單編號${newOrder._id}]${newOrder.name} 購買商品如下：
                    </p>
                <table width="726" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center">
                                <table style="border-collapse:collapse;border:1px solid #8c8c8c" width="600" cellspacing="0" cellpadding="10" border="0">
                                    <tbody>
                                        <tr>
                                            <td style="border:1px solid #8c8c8c" width="280" bgcolor="#efefef" align="center"><span style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px">購買商品</span></td>
                                            <td style="border:1px solid #8c8c8c" bgcolor="#efefef" align="center"><span style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px">購買數量</span></td>
                                        </tr>
                                        <tr>
                                            <td style="border:1px solid #8c8c8c" width="280" align="center"><span style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px;color:#ec008c">龍眼乾</span></td>
                                            <td style="border:1px solid #8c8c8c" align="center"><span style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px;color:#ec008c">${newOrder.count.longyan}</span></td>
                                        </tr>
                                        <tr>
                                            <td style="border:1px solid #8c8c8c" width="280" bgcolor="#efefef" align="center"><span style="font-family:'\\\\005fae\\\\008edf\\\\006b63\\\\009ed1\\\\009ad4';font-size:16px">買家地址</span></td>
                                            <td style="border:1px solid #8c8c8c" bgcolor="#efefef" align="center"><span style="font-family:'\\\\005fae\\\\008edf\\\\006b63\\\\009ed1\\\\009ad4';font-size:16px">推薦好友</span></td>
                                        </tr>
                                        <tr>
                                            <td style="border:1px solid #8c8c8c" width="280" align="center"><span style="font-family:'\\\\005fae\\\\008edf\\\\006b63\\\\009ed1\\\\009ad4';font-size:16px;color:#ec008c">[${newOrder.areanumber}]${newOrder.town}${newOrder.area}${newOrder.address}</span></td>
                                            <td style="border:1px solid #8c8c8c" align="center"><span style="font-family:'\\\\005fae\\\\008edf\\\\006b63\\\\009ed1\\\\009ad4';font-size:16px;color:#ec008c">${newOrder.friendcode}</span></td>
                                        </tr>  
                                    </tbody>
                                </table>   
                            </td>
                        </tr>
                        
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <a href="http://127.0.0.1:81/master/orderCheck/${newOrder._id}">
                                       確認訂單 
                            </a>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <p style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px;margin:0;padding:0;line-height:26px;color:#ec008c">貼心提醒：</p>
                                <p> 本產品僅提供 貨到付款 </p>
                            </td>
                        </tr>
        
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
                    
                </table>
            </td>
        </tr>
        </tbody>
    </table>
</div>
    `
    )
}

function emailCustomerTemplate (newOrder){
    return (
        `
<div>
    <table style="border:1px solid #dcdcdc" width="764" cellspacing="0" cellpadding="18" border="0">
        <tbody>
        <tr>
            <td bgcolor="#FFFFFF">
                    <p style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px;margin:0;padding:0;line-height:26px"> 
                        親愛的 ${newOrder.name} 您好: 
                            您的訂單編號為 ${newOrder._id} 購買商品如下：
                    </p>
                <table width="726" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center">
                                <table style="border-collapse:collapse;border:1px solid #8c8c8c" width="600" cellspacing="0" cellpadding="10" border="0">
                                    <tbody>
                                        <tr>
                                            <td style="border:1px solid #8c8c8c" width="280" bgcolor="#efefef" align="center"><span style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px">購買商品</span></td>
                                            <td style="border:1px solid #8c8c8c" bgcolor="#efefef" align="center"><span style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px">購買數量</span></td>
                                        </tr>
                                        <tr>
                                            <td style="border:1px solid #8c8c8c" width="280" align="center"><span style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px;color:#ec008c">龍眼乾</span></td>
                                            <td style="border:1px solid #8c8c8c" align="center"><span style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px;color:#ec008c">${newOrder.count.longyan}</span></td>
                                        </tr> 
                                    </tbody>
                                </table>   
                            </td>
                        </tr>
                        
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <p style="font-family:'\\005fae\\008edf\\006b63\\009ed1\\009ad4';font-size:16px;margin:0;padding:0;line-height:26px;color:#ec008c">貼心提醒：</p>
                                <p> 本產品僅提供 貨到付款 </p>
                            </td>
                        </tr>
        
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
                    
                </table>
            </td>
        </tr>
        </tbody>
    </table>
</div>
    `
    )
}


module.exports = {
    emailMasterTemplate: emailMasterTemplate,
    emailCustomerTemplate: emailCustomerTemplate
};