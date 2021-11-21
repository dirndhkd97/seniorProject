package api.senior.backend.controller;

import api.senior.backend.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/senior")
public class CommonController {

    @Autowired
    private CommonService commonService;

    /*@RequestMapping("/deviceChk")
    public String deviceChk(Device device) throws Exception {
        String type = "web";
        if(device.isMobile)
            type = "mobile";
        return type;
    }*/


    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody @Nullable HashMap<String,Object> params) throws Exception {
        return commonService.login(params);
    }

}
