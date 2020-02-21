template=require('./template');
header=template.header();

module.exports.gallery = function(navBar, menuLink, gallery) {
    
    return `
    <!DOCTYPE html>
    <html lang="ko">
<head>
${header}
</head>
<body>
<div class="container">
    ${navBar}
	<div class="row" style="margin-top: 30px">
        <div class="col-2">
            ${menuLink}
        </div>
        <div class="col-10">
            <div class="row" style="margin-left: 10px">
                <div class="col-12"><h3>갤러리</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <table class="table table-condensed table-hover">
                        <tbody>
                        <div class="row" style="margin-left: 10px">
                        <div class="col-1"></div>
                            <div class="col-10">
                                <div id="demo" class="carousel slide" data-ride="carousel">
                                    <ul class="carousel-indicators">
                                        <li data-target="#demo" data-slide-to="0" class="active"></li>
                                        <li data-target="#demo" data-slide-to="1"></li>
                                        <li data-target="#demo" data-slide-to="2"></li>
                                        <li data-target="#demo" data-slide-to="3"></li>
                                        <li data-target="#demo" data-slide-to="4"></li>
                                        <li data-target="#demo" data-slide-to="5"></li>
                                        <li data-target="#demo" data-slide-to="6"></li>
                                        <li data-target="#demo" data-slide-to="7"></li>
                                    </ul>
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img src="/gallery/actuator_1.jpg" alt="" width="655" height="375">
                                            <div class="carousel-caption">
                                            
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="/gallery/arduino_1.jpg" alt="" width="655" height="375">
                                            <div class="carousel-caption">
                                            
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="/gallery/arduino_2.jpg" alt="" width="655" height="375">
                                            <div class="carousel-caption">
                                            
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="/gallery/hard.jpg" alt="" width="655" height="375">
                                            <div class="carousel-caption">
                                        
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="/gallery/home.jpg" alt="" width="655" height="375">
                                            <div class="carousel-caption">
                                        
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="/gallery/weather.jpg" alt="" width="655" height="375">
                                            <div class="carousel-caption">
                                        
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="/gallery/raspberrypi.jpg" alt="" width="655" height="375">
                                            <div class="carousel-caption">
                                        
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="/gallery/code_img.jpg" alt="" width="655" height="375">
                                            <div class="carousel-caption">
                                        
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                        <span class="carousel-control-prev-icon"></span>
                                    </a>
                                    <a class="carousel-control-next" href="#demo" data-slide="next">
                                        <span class="carousel-control-next-icon"></span>
                                    </a>
                                </div>
                            </div>
                        <div class="col-1"></div>&nbsp;&nbsp;&nbsp;
                        <div class="row">
                            <div class="col-3"><img src="/gallery/actuator_1.jpg" class="rounded" alt="" width="200" height="116"></div>
                            <div class="col-3"><img src="/gallery/arduino_1.jpg" class="rounded" alt="" width="200" height="116"></div>
                            <div class="col-3"><img src="/gallery/arduino_2.jpg" class="rounded" alt="" width="200" height="116"></div>
                            <div class="col-3"><img src="/gallery/hard.jpg" class="rounded" alt="" width="200" height="116"></div>
                        </div>&nbsp;
                        <div class="row">
                            <div class="col-3"><img src="/gallery/home.jpg" class="rounded" alt="" width="200" height="116"></div>
                            <div class="col-3"><img src="/gallery/weather.jpg" class="rounded" alt="" width="200" height="116"></div>
                            <div class="col-3"><img src="/gallery/raspberrypi.jpg" class="rounded" alt="" width="200" height="116"></div>
                            <div class="col-3"><img src="/gallery/code_img.jpg" class="rounded" alt="" width="200" height="116"></div>
                        </div>
                        </tbody>
                    </table>
                </div>
                <div class="col-1"></div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}
