package api.senior.backend.controller;

import api.senior.backend.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/senior/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    @RequestMapping("/searchCommunityList")
    public Map<String,Object> searchCommunityList(@RequestBody @Nullable HashMap<String,Object> params) throws Exception {
        return communityService.searchCommunityList(params);
    }

    @RequestMapping("/searchCommunityInfo")
    public Map<String, Object> searchCommunityInfo(@RequestBody HashMap<String,Object> params) throws Exception {
        return communityService.searchCommunityInfo(params);
    }

    @RequestMapping("/removeCommunity")
    public int removeCommunity(@RequestBody HashMap<String,Object> params) throws Exception {
        return communityService.removeCommunity(params);
    }

    @RequestMapping("/registCommunity")
    public int registCommunity(@RequestBody HashMap<String,Object> params) throws Exception {
        return communityService.registCommunity(params);
    }

    @RequestMapping("/modifyCommunity")
    public int modifyCommunity(@RequestBody HashMap<String,Object> params) throws Exception {
        return communityService.modifyCommunity(params);
    }
}
