package api.senior.backend.controller;

import api.senior.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/senior/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @RequestMapping("/searchMberList")
    public Map<String,Object> searchMberList(@RequestBody @Nullable HashMap<String,Object> params) throws Exception {
        return adminService.searchMberList(params);
    }

    @RequestMapping("/searchMberInfo")
    public Map<String,Object> searchMberInfo(@RequestBody @Nullable HashMap<String,Object> params) throws Exception {
        return adminService.searchMberInfo(params);
    }

    @RequestMapping("/mberDplctChk")
    public String mberDplctChk(@RequestBody @Nullable HashMap<String,Object> params) throws Exception {
        return adminService.mberDplctChk(params);
    }

    @RequestMapping("/removeMber")
    public int removeMber(@RequestBody HashMap<String,Object> params) throws Exception {
        return adminService.removeMber(params);
    }

    @RequestMapping("/registMber")
    public int registMber(@RequestBody HashMap<String,Object> params) throws Exception {
        return adminService.registMber(params);
    }

    @RequestMapping("/modifyMber")
    public int modifyMber(@RequestBody HashMap<String,Object> params) throws Exception {
        return adminService.modifyMber(params);
    }

}
