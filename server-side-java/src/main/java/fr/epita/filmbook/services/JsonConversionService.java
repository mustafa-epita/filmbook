package fr.epita.filmbook.services;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class JsonConversionService implements StringConversionService {


    @Override
    public String convert(List<?> list){
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(list);
        }catch (Exception e) {
            return "";
        }
    }
}
